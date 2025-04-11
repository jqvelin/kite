"use client";

import { useRootStore } from "@/app/_providers";
import { observer } from "mobx-react-lite";

import { ChatCard } from "./ChatCard";
import { ChatsNotFound } from "./ChatsNotFound";

export const ChatsList = observer(() => {
    const { chats } = useRootStore();

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
