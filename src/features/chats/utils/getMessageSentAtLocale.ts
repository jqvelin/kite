const formatter = Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "short"
});

export const getMessageSentAtLocale = (sentAt: Date) => {
    if (sentAt.toDateString() === new Date().toDateString()) {
        return "сегодня";
    }

    return formatter.format(sentAt);
};
