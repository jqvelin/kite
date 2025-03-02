import { makeAutoObservable } from "mobx";

import { Tab } from "./Tab.type";

export class SidebarStore {
    activeTab: Tab = "chats";

    constructor() {
        makeAutoObservable(this);
    }

    setActiveTab = (tab: Tab) => {
        this.activeTab = tab;
    };
}
