"use client";

import { useRootStore } from "@/app/_providers";
import { MessageBubble } from "@/features/chats";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { ComponentPropsWithRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type ChatWindowMessagesProps = ComponentPropsWithRef<"div">;

export const ChatWindowMessages = observer(
    ({ className, ...props }: ChatWindowMessagesProps) => {
        const { data: session } = useSession();
        const { socket, chatRoom } = useRootStore();

        const chatWindowMessagesRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const scrollToTheBottom = () => {
                // не работает, так как сообщение добавляется в историю чата
                // после вызова этой функции...
                chatWindowMessagesRef.current?.scrollTo(
                    0,
                    chatWindowMessagesRef.current.scrollHeight
                );
            };
            socket?.on("receive-message", scrollToTheBottom);

            return () => {
                socket?.off("receive-message", scrollToTheBottom);
            };
        }, [socket]);

        return (
            <div
                ref={chatWindowMessagesRef}
                className={twMerge(
                    "pb-md min-h-0 gap-lg h-full overflow-y-auto flex flex-col",
                    className
                )}
                {...props}
            >
                {chatRoom?.messages.map((message) => (
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
