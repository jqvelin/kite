"use client";

import { type Message } from "../model/Message.type";
import { getMessageSentAt } from "../utils/getMessageSentAt";

type MessageProps = {
    message: Message;
    isSentByCurrentUser: boolean;
};

export const MessageBubble = ({
    message,
    isSentByCurrentUser
}: MessageProps) => {
    const { hours, minutes } = getMessageSentAt(message);

    return (
        <div
            className={`relative w-fit min-w-16 max-w-120 ${isSentByCurrentUser ? "ml-auto" : "mr-auto"}`}
        >
            <div
                className={`border-2 p-sm rounded-sm ${isSentByCurrentUser ? "border-accent/50" : "border-border"}`}
            >
                {message.body}
            </div>
            <div
                className={`absolute bottom-0 translate-y-full flex justify-end ${!isSentByCurrentUser ? "flex-row-reverse" : ""} items-start w-full text-xs`}
            >
                <div>{hours + ":" + minutes}</div>
                <div
                    className={`w-4 aspect-square [clip-path:polygon(100%_0,_0_0,_100%_100%)] ${isSentByCurrentUser ? "right-1 bg-accent/50 mr-1" : "left-1 ml-1 -scale-x-100 bg-border"}`}
                ></div>
            </div>
        </div>
    );
};
