import { type User } from "@/entities/user";
import {
    type Chat,
    ChatsStore,
    type ClientToServerEvent,
    type Message,
    type ServerToClientEvent,
    type UserChatStatus,
    createChat,
    getChats,
    sendMessage
} from "@/features/chats";
import { queryClient } from "@/shared/api";
import { DashboardStore } from "@/widgets/dashboard";
import { makeAutoObservable } from "mobx";
import { getSession } from "next-auth/react";
import { type Socket, io } from "socket.io-client";

export class RootStore {
    dashboardStore = new DashboardStore();

    chatsStore = new ChatsStore(
        () => ({
            queryKey: ["chats"],
            queryFn: getChats,
            select(data) {
                const chatsWithSortedMessages = data.map((chat) => {
                    if ("isStarted" in chat) {
                        return {
                            ...chat,
                            messages: chat.messages.sort((a, b) => {
                                const dateA = new Date(a.sentAt);
                                const dateB = new Date(b.sentAt);

                                return dateA.getTime() - dateB.getTime();
                            })
                        };
                    }

                    return {
                        ...chat,
                        isStarted: true,
                        messages: chat.messages.sort((a, b) => {
                            const dateA = new Date(a.sentAt);
                            const dateB = new Date(b.sentAt);

                            return dateA.getTime() - dateB.getTime();
                        })
                    };
                });

                return chatsWithSortedMessages;
            },
            staleTime: 60 * 1000
        }),
        queryClient
    );

    private currentChatId: Chat["id"] | null = null;
    private socket: Socket<ServerToClientEvent, ClientToServerEvent> | null =
        null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get chats() {
        const chatsSearchQuery = this.dashboardStore.chatsSearchQuery;

        if (!chatsSearchQuery) return this.chatsStore.chats;

        return this.chatsStore.chats.filter((chat) => {
            const membersNameIncludeQuery = chat.members.some((member) =>
                member.name?.toLowerCase().includes(chatsSearchQuery)
            );

            const messagesIncludeQuery = chat.messages.some((message) =>
                message.body
                    .toLowerCase()
                    .includes(this.dashboardStore.chatsSearchQuery)
            );

            return membersNameIncludeQuery || messagesIncludeQuery;
        });
    }

    async openChat(chat: Chat | Chat["id"]) {
        if (typeof chat === "object") {
            this.chatsStore.addChat(chat);
            this.setCurrentChatId(chat.id);

            return;
        }

        const session = await getSession();

        if (this.currentChatId) {
            this.socket?.emit(
                "chatter-status-changed",
                session?.user?.id as string,
                this.currentChatId,
                "offline"
            );
        }

        this.setCurrentChatId(chat);

        this.socket?.emit(
            "chatter-status-changed",
            session?.user?.id as string,
            chat,
            "online"
        );
    }

    async sendMessage(senderId: User["id"], messageBody: Message["body"]) {
        if (!this.currentChat) return;

        if (!this.currentChat.isStarted) {
            const chat = await createChat({
                memberIds: this.currentChat.members.map(({ id }) => id)
            });

            const clientSideMessageData: Message = {
                body: messageBody,
                chatId: chat.id,
                id: crypto.randomUUID(),
                sentAt: new Date(),
                sentById: senderId
            };

            this.chatsStore.receiveMessage(clientSideMessageData);

            const { message } = await sendMessage(chat.id, messageBody);

            if (message) {
                this.socket?.emit("send-message", message, true);
            }

            this.currentChat.isStarted = true;

            this.setCurrentChatId(chat.id);

            return;
        }

        const clientSideMessageData: Message = {
            body: messageBody,
            chatId: this.currentChat.id,
            id: crypto.randomUUID(),
            sentAt: new Date(),
            sentById: senderId
        };

        this.chatsStore.receiveMessage(clientSideMessageData);

        const { message } = await sendMessage(this.currentChat.id, messageBody);

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

    setCurrentChatId(chatId: Chat["id"] | null) {
        this.currentChatId = chatId;
    }

    connectToWebSocketServer(userId: User["id"]) {
        this.socket = io({ extraHeaders: { "x-user-id": userId } });

        const receiveMessage = (message: Message) => {
            this.chatsStore.receiveMessage(message);
        };

        const changeChatterStatus = (
            chatterId: User["id"],
            chatId: Chat["id"],
            newStatus: UserChatStatus
        ) => {
            this.chatsStore.changeChatterStatus(chatterId, chatId, newStatus);
        };

        this.socket.on("receive-message", receiveMessage);
        this.socket.on("chatter-status-changed", changeChatterStatus);
    }

    disconnectFromWebSocketServer() {
        this.socket?.disconnect();
    }
}
