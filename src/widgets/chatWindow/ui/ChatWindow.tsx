"use client";

import { useRootStore } from "@/app/_providers";
import { observer } from "mobx-react-lite";

import { ChatUnselectedMessage } from "./ChatUnselectedMessage";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { ChatWindowMessageForm } from "./ChatWindowMessageForm";
import { ChatWindowMessages } from "./ChatWindowMessages";

export const ChatWindow = observer(() => {
    const { currentChat } = useRootStore();

    if (!currentChat) return <ChatUnselectedMessage />;

    return (
        <div className="flex-1 bg-background h-full rounded-lg shadow-lg gap-md md:flex flex-col hidden p-md">
            <ChatWindowHeader />
            <ChatWindowMessages className="h-full" />
            <ChatWindowMessageForm />
        </div>
    );
});
