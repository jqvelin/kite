import { type User } from "@prisma/client";

import { UserRegistrationType } from "./UserRegistrationModel";
import { UserSignInType } from "./UserSignInModel";

export type RegistrationResponse = {
    user?: User;
    errors?: {
        formField: keyof UserRegistrationType;
        message: string;
    }[];
};

export type SignInResponse = {
    user?: User;
    errors?: {
        formField: keyof UserSignInType;
        message: string;
    }[];
};
