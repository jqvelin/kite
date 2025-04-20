import { type User } from "./user.type";
import { UserRegistrationForm } from "./userRegistrationForm.type";

export type UserRegistrationResponse = {
    user?: User;
    errors?: {
        formField: keyof UserRegistrationForm;
        message: string;
    }[];
};
