import { Message } from "./Message.type";

export type ServerToClientEvent = {
    receive_message: (message: Message) => void;
};
