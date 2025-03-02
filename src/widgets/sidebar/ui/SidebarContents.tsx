"use client";

import { useRootStore } from "@/app/_providers/RootStore";
import { observer } from "mobx-react-lite";

import { ActiveTabToggler } from "./ActiveTabToggler";
import { ChatsTab } from "./ChatsTab";
import { UsersTab } from "./UsersTab";

export const SidebarContents = observer(() => {
    const {
        sidebarStore: { activeTab, setActiveTab }
    } = useRootStore();

    return (
        <div className="flex-1 flex flex-col">
            <ActiveTabToggler
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {activeTab === "chats" ? <ChatsTab /> : <UsersTab />}
        </div>
    );
});
