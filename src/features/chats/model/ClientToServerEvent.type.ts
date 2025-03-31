import { Chat } from "./Chat.type";
import { Message } from "./Message.type";

export type ClientToServerEvent = {
    "join-room": (chatRoomId: Chat["id"]) => void;
    "send-message": (message: Message) => void;
};
