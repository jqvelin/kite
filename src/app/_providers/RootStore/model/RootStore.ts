import { type User } from "@/entities/user";
import {
    type Chat,
    type ClientToServerEvent,
    type Message,
    type ServerToClientEvent,
    sendMessage
} from "@/features/chats";
import { DashboardStore } from "@/widgets/dashboard";
import { makeAutoObservable } from "mobx";
import { type Socket, io } from "socket.io-client";

export class RootStore {
    dashboardStore: DashboardStore;
    chatRoom: Chat | null = null;
    socket: Socket<ServerToClientEvent, ClientToServerEvent> | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.dashboardStore = new DashboardStore();
    }

    connectToWebSocketServer(userId: User["id"]) {
        this.socket = io({ extraHeaders: { "x-user-id": userId } });
    }

    disconnectFromWebSocketServer() {
        this.socket?.disconnect();
    }

    joinChatRoom(chatRoom: Chat) {
        this.socket?.emit("join-room", chatRoom.id);
        this.chatRoom = chatRoom;
    }

    receiveChatMessage(message: Message) {
        this.chatRoom?.messages.push(message);
    }

    async sendMessage(senderId: User["id"], messageBody: Message["body"]) {
        if (!this.chatRoom) return;

        this.chatRoom?.messages.push({
            body: messageBody,
            chatId: this.chatRoom.id,
            id: crypto.randomUUID(),
            sentAt: new Date(),
            sentById: senderId
        });

        const { message } = await sendMessage(this.chatRoom.id, messageBody);

        if (message) {
            this.socket?.emit("send-message", message);
        }
    }
}
