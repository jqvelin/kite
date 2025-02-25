"use client";

import { useState } from "react";

import { Tab } from "../model/Tab.type";
import { ActiveTabToggler } from "./ActiveTabToggler";
import { ChatsTab } from "./ChatsTab";
import { UsersTab } from "./UsersTab";

export const SidebarContents = () => {
    const [activeTab, setActiveTab] = useState<Tab>("chats");

    return (
        <div className="flex-1 flex flex-col">
            <ActiveTabToggler
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {activeTab === "chats" ? <ChatsTab /> : <UsersTab />}
        </div>
    );
};
