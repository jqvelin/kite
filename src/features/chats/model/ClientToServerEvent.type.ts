import { Message } from "./Message.type";

export type ClientToServerEvent = {
    send_message: (message: Message) => void;
};
