import { type User } from "@/entities/user";

import { type Chat } from "./Chat.type";
import { type Message } from "./Message.type";
import { type UserChatStatus } from "./UserChatStatus.type";

export type ClientToServerEvent = {
    "join-room": (chatId: Chat["id"]) => void;
    "chatter-status-changed": (
        userId: User["id"],
        chatId: Chat["id"],
        newStatus: UserChatStatus
    ) => void;
    "send-message": (message: Message, isFirst?: boolean) => void;
};
