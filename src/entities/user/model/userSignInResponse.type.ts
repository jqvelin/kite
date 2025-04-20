import { type User } from "./user.type";
import { UserSignInForm } from "./userSignInForm.type";

export type UserSignInResponse = {
    user?: User;
    errors?: {
        formField: keyof UserSignInForm;
        message: string;
    }[];
};
