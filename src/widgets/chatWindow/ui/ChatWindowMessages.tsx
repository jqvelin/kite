"use client";

import { useRootStore } from "@/app/_providers";
import { MessageBubble } from "@/features/chats";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

import { useScrollOnMessageReception } from "../hooks/useScrollOnMessageReception";

type ChatWindowMessagesProps = ComponentPropsWithRef<"div">;

export const ChatWindowMessages = observer(
    ({ className, ...props }: ChatWindowMessagesProps) => {
        const { data: session } = useSession();

        const { currentChat } = useRootStore();

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
                {currentChat?.messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isSentByCurrentUser={
                            session?.user?.id === message.sentById
                        }
                    />
                ))}
            </div>
        );
    }
);
