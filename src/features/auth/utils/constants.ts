export const AUTH_ERRORS = {
    name: {
        empty: "Имя пользователя обязательно",
        tooLong: "Не более 20 символов",
        taken: "Имя пользователя занято"
    },

    email: {
        empty: "Электронная почта обязательна",
        taken: "Эта электронная почта уже используется",
        notFound: "Такого пользователя не существует"
    }
} as const;

export const VERIFICATION_EMAIL_STYLES = {
    emailBackgroundColor: "#e0f2fe",
    mainBackgroundColor: "#ffffff",
    textColor: "#4b5563",
    buttonColor: "#0284c7"
} as const;
