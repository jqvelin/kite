import { type Chat } from "./Chat.type";

export type CreateChatInfo = {
    memberIds: Chat["members"][number]["id"][];
};
