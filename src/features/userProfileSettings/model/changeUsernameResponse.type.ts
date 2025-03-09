import { type User } from "@/entities/user";

export type ChangeUsernameResponse = {
    user?: User;
    error?: {
        message: string;
    };
};
