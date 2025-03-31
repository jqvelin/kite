import { Tab } from "@/entities/tab";
import { makeAutoObservable } from "mobx";

export class DashboardStore {
    activeTab: Tab = "chats";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setActiveTab = (tab: Tab) => {
        this.activeTab = tab;
    };
}
