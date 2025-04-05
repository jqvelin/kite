import "dotenv/config";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { ClientToServerEvent, ServerToClientEvent } from "./src/features/chats";
// проблемы с модулями при импортировании из barrel file
import { db } from "./src/shared/api/prisma/db";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server<ClientToServerEvent, ServerToClientEvent>(httpServer);

    io.on("connection", async (socket) => {
        console.log(`${socket.id} is connected!`);

        const userId = socket.handshake.headers["x-user-id"] as string;
        const chats = await db.chat.findMany({
            where: {
                members: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        chats.forEach((chat) => socket.join(chat.id));

        socket.on("join-room", (chatRoomId) => {
            console.log(`${socket.id} joins room ${chatRoomId}`);
        });

        socket.on("send-message", (message) => {
            console.log(`${socket.id} says "${message.body}"`);
            socket.to(message.chatId).emit("receive-message", message);
        });

        socket.on("disconnect", () => {
            console.warn(`${socket.id} is disconnected`);
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
