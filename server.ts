import "dotenv/config";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

import {
    type ClientToServerEvent,
    type ServerToClientEvent
} from "./src/features/chats";
// проблемы с модулями при импортировании из barrel file
import { db } from "./src/shared/api/prisma/db";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME;
const port = Number(process.env.PORT);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server<ClientToServerEvent, ServerToClientEvent>(httpServer);

    io.on("connection", async (socket) => {
        console.log(`${socket.id} is connected!`);

        const userId = socket.handshake.headers["x-user-id"] as string;

        // Подключаем пользователя ко всем комнатам чатов, в которых он присутствует,
        // чтобы присылать новые сообщения в каждом из них.
        let chats = await db.chat.findMany({
            where: {
                members: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        chats.forEach((chat) => socket.join(chat.id));

        socket.on("join-room", async (chatRoomId) => {
            console.log(`${socket.id} joins room ${chatRoomId}`);

            socket.join(chatRoomId);

            chats = await db.chat.findMany({
                where: {
                    members: {
                        some: {
                            id: userId
                        }
                    }
                }
            });
        });

        socket.on(
            "chatter-status-changed",
            async (userId, chatId, newStatus) => {
                console.log(
                    `Status of ${userId} has been changed to ${newStatus}`
                );

                if (newStatus === "online") {
                    await db.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            onlineIn: {
                                connect: {
                                    id: chatId
                                }
                            }
                        }
                    });
                } else {
                    await db.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            onlineIn: {
                                disconnect: {
                                    id: chatId
                                }
                            }
                        }
                    });
                }

                socket
                    .to(chatId)
                    .emit("chatter-status-changed", userId, chatId, newStatus);
            }
        );

        socket.on("send-message", async (message) => {
            console.log(`${socket.id} says "${message.body}"`);

            const isChatWithLlama = await db.chat.findFirst({
                where: {
                    id: message.chatId,
                    members: {
                        some: {
                            id: process.env.NEXT_PUBLIC_LLAMA_USER_ID
                        }
                    }
                }
            });

            if (isChatWithLlama) {
                const prompt = message.body;

                const r = await fetch("http://localhost:8080/completion", {
                    method: "POST",
                    body: JSON.stringify({
                        prompt: `<|user|>${prompt}<|end|><|assistant|>`,
                        n_predict: 250
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const response = (await r.json()).content;

                const messageFromLlama = await db.message.create({
                    data: {
                        body: response,
                        chatId: message.chatId,
                        sentById: process.env
                            .NEXT_PUBLIC_LLAMA_USER_ID as string
                    }
                });

                io.in(message.chatId).emit("receive-message", messageFromLlama);

                return;
            }

            socket.to(message.chatId).emit("receive-message", message);
        });

        socket.on("disconnect", () => {
            console.warn(`${socket.id} is disconnected`);

            chats.forEach(async (chat) => {
                socket
                    .to(chat.id)
                    .emit("chatter-status-changed", userId, chat.id, "offline");

                await db.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        onlineIn: {
                            disconnect: {
                                id: chat.id
                            }
                        }
                    }
                });
            });
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
