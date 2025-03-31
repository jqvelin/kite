"use client";

import { useRootStore } from "@/app/_providers";
import { observer } from "mobx-react-lite";

import { ChatWindowHeader } from "./ChatWindowHeader";
import { ChatWindowMessageForm } from "./ChatWindowMessageForm";
import { ChatWindowMessages } from "./ChatWindowMessages";

export const ChatWindow = observer(() => {
    const { chatRoom } = useRootStore();
    if (!chatRoom) return <ChatUnselectedMessage />;

    return (
        <div className="flex-1 bg-background h-full rounded-lg shadow-lg gap-md md:flex flex-col hidden p-md">
            <ChatWindowHeader chatRoom={chatRoom} />
            <ChatWindowMessages className="h-full" />
            <ChatWindowMessageForm />
        </div>
    );
});

export const ChatUnselectedMessage = () => (
    <div className="flex-1 bg-background h-full rounded-lg shadow-lg md:flex flex-col items-center justify-center text-center hidden">
        <h1 className="text-accent md:text-xl font-bold mb-sm">
            Добро пожаловать в Kite!
        </h1>
        <h2 className="font-semibold">
            Выберите чат или начните новую переписку
        </h2>
    </div>
);
