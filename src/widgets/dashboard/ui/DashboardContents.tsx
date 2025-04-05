"use client";

import { useRootStore } from "@/app/_providers";
import { ActiveTabToggler } from "@/entities/tab";
import type { Chat, Message } from "@/features/chats";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { getActiveTabComponent } from "../utils/getActiveTabComponent";

export const DashboardContents = observer(() => {
    const {
        dashboardStore: { activeTab, setActiveTab },
        socket,
        receiveChatMessage
    } = useRootStore();
    const queryClient = useQueryClient();

    useEffect(() => {
        const receiveMessageHandler = (message: Message) => {
            receiveChatMessage(message);
            queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
                const newChats = oldChats?.map((chat) => {
                    if (chat.id === message.chatId) {
                        return {
                            ...chat,
                            messages: [...chat.messages, message]
                        };
                    }

                    return chat;
                });

                return newChats;
            });
        };

        socket?.on("receive-message", receiveMessageHandler);

        return () => {
            socket?.off("receive-message", receiveMessageHandler);
        };
    }, [socket]);

    const ActiveTab = getActiveTabComponent(activeTab);

    return (
        <div className="flex-1 flex flex-col">
            <ActiveTabToggler
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <ActiveTab />
        </div>
    );
});
