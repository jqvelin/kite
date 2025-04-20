"use client";

import { useRootStore } from "@/app/_providers";
import { ChatImage, getChatRoomNameByMembers } from "@/features/chats";
import { type Chat } from "@/features/chats";
import { Button } from "@/shared/ui";
import { useSession } from "next-auth/react";

type ChatCardProps = {
    chat: Chat;
};

export const ChatCard = ({ chat }: ChatCardProps) => {
    const { data: session } = useSession();

    const { openChat } = useRootStore();

    const chatName = getChatRoomNameByMembers(
        session?.user?.id as string,
        chat.members
    );

    const lastChatMessage = chat.messages[chat.messages.length - 1] ?? null;

    return (
        <Button
            key={chat.id}
            variant="ghost"
            className="w-full"
            onClick={() => openChat(chat.id)}
        >
            <div className="h-16 flex items-center gap-md px-sm w-full">
                <ChatImage chat={chat} />
                <div className="flex flex-col items-start">
                    <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                        {chatName}
                    </p>
                    <p className="text-sm max-w-64 text-start whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {lastChatMessage?.sentById === session?.user?.id && (
                            <span className="text-accent/50">Вы:&nbsp;</span>
                        )}
                        {lastChatMessage?.body}
                    </p>
                </div>
            </div>
        </Button>
    );
};
