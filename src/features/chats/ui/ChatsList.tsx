"use client";

import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";

import { useGetChatsQuery } from "../api/useGetChatsQuery";
import { ChatCard } from "./ChatCard";
import { ChatsNotFound } from "./ChatsNotFound";

export const ChatsList = observer(() => {
    const { data: session } = useSession();
    const { data: chats } = useGetChatsQuery(session?.user?.id as string);

    return (
        <div className="w-full flex flex-col flex-1">
            {!!chats?.length ? (
                chats?.map((chat) => (
                    <ChatCard
                        key={chat.id}
                        chat={chat}
                    />
                ))
            ) : (
                <ChatsNotFound />
            )}
        </div>
    );
});
