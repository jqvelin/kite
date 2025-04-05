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

    const { joinChatRoom } = useRootStore();

    const chatName = getChatRoomNameByMembers(
        session?.user?.id as string,
        chat.members
    );

    return (
        <Button
            key={chat.id}
            variant="ghost"
            className="w-full"
            onClick={() => joinChatRoom(chat)}
        >
            <div className="h-16 flex items-center gap-md px-sm w-full">
                <ChatImage />
                <div className="flex flex-col items-start">
                    <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                        {chatName}
                    </p>
                    <p className="text-sm">
                        {chat.messages[chat.messages.length - 1]?.body}
                    </p>
                </div>
            </div>
        </Button>
    );
};
