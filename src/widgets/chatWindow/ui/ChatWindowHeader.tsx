"use client";

import { useRootStore } from "@/app/_providers";
import { ChatImage, getChatRoomNameByMembers } from "@/features/chats";
import { useSession } from "next-auth/react";

export const ChatWindowHeader = () => {
    const { data: session } = useSession();

    const { currentChat } = useRootStore();

    const chatRoomName = getChatRoomNameByMembers(
        session?.user?.id as string,
        currentChat!.members
    );

    return (
        <div className="flex items-center gap-md">
            <ChatImage />
            <div className="text-xl font-semibold">{chatRoomName}</div>
        </div>
    );
};
