import { type Chat } from "@/features/chats";
import { DashboardStore } from "@/widgets/dashboard";
import { makeAutoObservable } from "mobx";

export class RootStore {
    dashboardStore = new DashboardStore();
    chatRoom: Chat | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setChatRoom(chatRoom: Chat) {
        this.chatRoom = chatRoom;
    }
}
