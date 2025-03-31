"use client";

import { Button } from "@/shared/ui";
import { BiSend } from "react-icons/bi";

export const ChatWindowMessageForm = () => {
    return (
        <div className="flex items-center gap-md">
            <textarea
                className="border-accent/50 outline-accent border-2 resize-none p-sm rounded-md w-full"
                rows={1}
                placeholder="Сообщение"
            ></textarea>
            <Button
                variant="ghost"
                className="h-full aspect-square rounded-full flex items-center justify-center"
            >
                <BiSend size="1.5rem" />
            </Button>
        </div>
    );
};
