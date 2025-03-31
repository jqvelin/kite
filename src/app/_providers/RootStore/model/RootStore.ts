import type {
    Chat,
    ClientToServerEvent,
    ServerToClientEvent
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

    connectToWebSocketServer() {
        this.socket = io();
    }

    disconnectFromWebSocketServer() {
        this.socket?.disconnect();
    }

    joinChatRoom(chatRoom: Chat) {
        this.socket?.emit("join-room", chatRoom.id);
        this.chatRoom = chatRoom;
    }
}
