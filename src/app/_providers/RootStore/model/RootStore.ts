import { type User } from "@/entities/user";
import {
    type Chat,
    ChatsStore,
    type ClientToServerEvent,
    type Message,
    type ServerToClientEvent,
    getChats,
    sendMessage
} from "@/features/chats";
import { queryClient } from "@/shared/api";
import { DashboardStore } from "@/widgets/dashboard";
import { makeAutoObservable } from "mobx";
import { type Socket, io } from "socket.io-client";

export class RootStore {
    dashboardStore = new DashboardStore();

    chatsStore = new ChatsStore(
        () => ({
            queryKey: ["chats"],
            queryFn: getChats
        }),
        queryClient
    );

    private currentChatId: Chat["id"] | null = null;
    private socket: Socket<ServerToClientEvent, ClientToServerEvent> | null =
        null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    openChat(chatId: Chat["id"]) {
        this.currentChatId = chatId;
    }

    async sendMessage(senderId: User["id"], messageBody: Message["body"]) {
        if (!this.currentChatId) return;

        const clientSideMessageData: Message = {
            body: messageBody,
            chatId: this.currentChatId,
            id: crypto.randomUUID(),
            sentAt: new Date(),
            sentById: senderId
        };

        this.chatsStore.receiveMessage(clientSideMessageData);

        const { message } = await sendMessage(this.currentChatId, messageBody);

        if (message) {
            this.socket?.emit("send-message", message);
        }
    }

    get currentChat() {
        if (!this.currentChatId) return null;

        return this.chatsStore.chats.find(
            (chat) => chat.id === this.currentChatId
        );
    }

    connectToWebSocketServer(userId: User["id"]) {
        this.socket = io({ extraHeaders: { "x-user-id": userId } });

        const receiveMessage = (message: Message) => {
            this.chatsStore.receiveMessage(message);
        };

        this.socket.on("receive-message", receiveMessage);
    }

    disconnectFromWebSocketServer() {
        this.socket?.disconnect();
    }
}
