import { Message } from "./Message.type";

export type ServerToClientEvent = {
    "receive-message": (message: Message) => void;
};
