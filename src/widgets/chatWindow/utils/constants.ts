// Слушаем событие нажатия Enter на textarea,
// чтобы отменить перенос строки и вместо этого отправить сообщение
export const KEYDOWN_EVENT_CONSTRAINTS = {
    type: "keydown",
    shiftKey: false,
    code: "Enter"
} as const;
