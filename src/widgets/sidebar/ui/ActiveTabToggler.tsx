"use client";

import { Button } from "@/shared/ui";

import { Tab } from "../model/Tab.type";

type ActiveTabTogglerProps = {
    activeTab: Tab;
    setActiveTab: (nextActiveTab: Tab) => void;
};

export const ActiveTabToggler = ({
    activeTab,
    setActiveTab
}: ActiveTabTogglerProps) => {
    return (
        <div className="w-full flex relative h-12 border-b-1">
            <Button
                onClick={() => setActiveTab("chats")}
                variant="ghost"
                className="text-primary flex-1 hover:bg-transparent"
            >
                Чаты
            </Button>
            <Button
                onClick={() => setActiveTab("users")}
                variant="ghost"
                className="text-primary flex-1 hover:bg-transparent"
            >
                Люди
            </Button>
            <div
                className={`h-0.5 w-1/2 absolute bottom-0 translate-y-1/2 ${activeTab === "chats" ? "translate-x-0" : "translate-x-full"} bg-accent transition-transform`}
            ></div>
        </div>
    );
};
