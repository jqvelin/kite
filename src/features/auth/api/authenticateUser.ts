"use server";

import { db } from "@/shared/api";

import { signIn } from "../auth";
import { SignInResponse } from "../model/AuthResponse.type";
import { UserSignInType } from "../model/UserSignInModel";
import { AUTH_ERRORS } from "../utils/constants";

export const authenticateUser = async (
    userData: UserSignInType
): Promise<SignInResponse> => {
    const { email } = userData;

    const errors: SignInResponse["errors"] = [];

    if (!email) {
        errors.push({ formField: "email", message: AUTH_ERRORS.email.empty });
        return { errors };
    }

    const user = await db.user.findFirst({
        where: {
            email
        }
    });

    if (user) {
        await signIn("resend", { email, redirect: false });
        return { user };
    }

    errors.push({
        formField: "email",
        message: AUTH_ERRORS.email.notFound
    });
    return { errors };
};
