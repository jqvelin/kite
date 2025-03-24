"use client";

import { useRootStore } from "@/app/_providers";
import { type Chat } from "@/features/chats";
import { Button } from "@/shared/ui";

import { ChatImage } from "./ChatImage";

type ChatCardProps = {
    chat: Chat;
};

export const ChatCard = ({ chat }: ChatCardProps) => {
    const { setChatRoom } = useRootStore();

    return (
        <Button
            key={chat.id}
            variant="ghost"
            className="w-full"
            onClick={() => setChatRoom(chat)}
        >
            <div className="h-16 flex items-center gap-md px-sm w-full">
                <ChatImage />
                <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                    {chat.id}
                </p>
            </div>
        </Button>
    );
};
