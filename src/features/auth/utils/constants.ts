export const REGISTRATION_ERRORS = {
    name: {
        empty: "Name is empty",
        tooLong: "Name should not be longer than 20 characters",
        taken: "User already exists"
    },

    email: {
        empty: "Email is empty",
        taken: "User already exists"
    }
} as const;
