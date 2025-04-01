import { Message } from "./Message.type";

export type SendMessageResponse = {
    message?: Message;
    error?: {
        message: string;
    };
};
