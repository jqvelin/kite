"use server";

import { db } from "@/shared/api";
import { signIn } from "@/shared/auth";

import { UserSignInForm } from "../model/userSignInForm.type";
import { UserSignInResponse } from "../model/userSignInResponse.type";
import { USER_AUTH_ERRORS } from "../utils/constants";

export const authenticateUser = async (
    userData: UserSignInForm
): Promise<UserSignInResponse> => {
    const { email } = userData;

    const errors: UserSignInResponse["errors"] = [];

    if (!email) {
        errors.push({
            formField: "email",
            message: USER_AUTH_ERRORS.email.empty
        });
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
        message: USER_AUTH_ERRORS.email.notFound
    });
    return { errors };
};
