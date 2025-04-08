import { type Message } from "../model/Message.type";

export const getChatMessagesGroupedByDate = (chatMessages: Message[]) => {
    const groups: { date: Date; messages: Message[] }[] = [];

    chatMessages.forEach((message) => {
        const group = groups.find((group) => {
            const sameDay =
                group.date.getDate() === new Date(message.sentAt).getDate();
            const sameMonth =
                group.date.getMonth() === new Date(message.sentAt).getMonth();
            const sameYear =
                group.date.getFullYear() ===
                new Date(message.sentAt).getFullYear();

            return sameDay && sameMonth && sameYear;
        });

        if (group) {
            group.messages.push(message);
        } else {
            groups.push({
                date: new Date(message.sentAt),
                messages: [message]
            });
        }
    });

    return groups;
};
