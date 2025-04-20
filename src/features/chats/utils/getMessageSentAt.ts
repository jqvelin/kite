import { type Message } from "../model/Message.type";

export const getMessageSentAt = (message: Message) => {
    const date = new Date(message.sentAt);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return { hours, minutes };
};
