import { type User } from "@/entities/user";

import { type Chat } from "./Chat.type";
import { type Message } from "./Message.type";
import { type UserChatStatus } from "./UserChatStatus.type";

export type ServerToClientEvent = {
    "chatter-status-changed": (
        userId: User["id"],
        chatId: Chat["id"],
        newStatus: UserChatStatus
    ) => void;
    "receive-message": (message: Message) => void;
};
