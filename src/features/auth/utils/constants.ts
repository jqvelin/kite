export const REGISTRATION_ERRORS = {
    nickname: {
        empty: "Nickname is empty",
        tooLong: "Nickname should not be longer than 20 characters",
        taken: "User already exists"
    },
    fullName: {
        empty: "Full name is empty"
    },
    password: {
        empty: "Password is required",
        tooShort: "Password should be 8 characters or more"
    },
    // При входе введено неизвестное имя пользователя
    // или неправильный пароль
    credentials: {
        invalid: "Invalid credentials"
    }
} as const;

export const BCRYPT_SALT_ROUNDS = 10;
