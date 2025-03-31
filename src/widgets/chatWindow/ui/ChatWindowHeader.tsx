"use client";

import { Chat, ChatImage, getChatRoomNameByMembers } from "@/features/chats";
import { useSession } from "next-auth/react";

type ChatWindowHeaderProps = {
    chatRoom: Chat;
};

export const ChatWindowHeader = ({ chatRoom }: ChatWindowHeaderProps) => {
    const { data: session } = useSession();

    const chatRoomName = getChatRoomNameByMembers(
        session?.user?.id as string,
        chatRoom.members
    );

    return (
        <div className="flex items-center gap-md">
            <ChatImage />
            <div className="text-xl font-semibold">{chatRoomName}</div>
        </div>
    );
};
