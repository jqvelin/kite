"use client";

import { useRootStore } from "@/app/_providers";
import {
    MessageBubble,
    getChatMessagesGroupedByDate,
    getMessageSentAtLocale
} from "@/features/chats";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { ComponentPropsWithRef, Fragment, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { useScrollOnMessageReception } from "../hooks/useScrollOnMessageReception";

type ChatWindowMessagesProps = ComponentPropsWithRef<"div">;

export const ChatWindowMessages = observer(
    ({ className, ...props }: ChatWindowMessagesProps) => {
        const { data: session } = useSession();

        const { currentChat } = useRootStore();

        const messagesGroupedByDate = useMemo(() => {
            return getChatMessagesGroupedByDate(currentChat?.messages ?? []);
        }, [currentChat?.messages]);

        const chatWindowMessagesRef = useScrollOnMessageReception();

        return (
            <div
                ref={chatWindowMessagesRef}
                className={twMerge(
                    "pb-md min-h-0 gap-lg h-full overflow-y-auto flex flex-col",
                    className
                )}
                {...props}
            >
                {messagesGroupedByDate.map(({ date, messages }) => (
                    <Fragment key={date.toUTCString()}>
                        <div className="self-center text-white bg-accent/50 px-sm rounded-full">
                            {getMessageSentAtLocale(date)}
                        </div>
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                isSentByCurrentUser={
                                    session?.user?.id === message.sentById
                                }
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        );
    }
);
