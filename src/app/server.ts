import { ClientToServerEvent, ServerToClientEvent } from "@/features/chats";
import "dotenv/config";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server<ClientToServerEvent, ServerToClientEvent>(httpServer);

    io.on("connection", (socket) => {
        console.log(`${socket.id} is connected!`);

        socket.on("send_message", (message) => {
            console.log(`${socket.id} says "${message.body}"`);
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
