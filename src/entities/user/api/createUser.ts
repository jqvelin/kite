"use server";

import { db } from "@/shared/api";
import { signIn } from "@/shared/auth";

import { type UserRegistrationForm } from "../model/userRegistrationForm.type";
import { type UserRegistrationResponse } from "../model/userRegistrationResponse.type";
import { USER_AUTH_ERRORS } from "../utils/constants";
import { createChatWithLlama } from "../utils/createChatWithLlama";

export const createUser = async (
    userData: UserRegistrationForm
): Promise<UserRegistrationResponse> => {
    const { email, name } = userData;

    const errors: UserRegistrationResponse["errors"] = [];

    if (!email)
        errors.push({
            formField: "email",
            message: USER_AUTH_ERRORS.email.empty
        });
    if (!name)
        errors.push({
            formField: "name",
            message: USER_AUTH_ERRORS.name.empty
        });

    if (name.length > 20) {
        errors.push({
            formField: "name",
            message: USER_AUTH_ERRORS.name.tooLong
        });
    }

    const conflictingUser = await db.user.findFirst({
        where: {
            OR: [
                {
                    email
                },
                { name }
            ]
        }
    });

    if (!conflictingUser) {
        const user = await db.user.create({
            data: {
                name,
                email
            }
        });

        await createChatWithLlama(user);

        await signIn("resend", { email, redirect: false });

        return { user };
    }

    const isNameTaken = conflictingUser.name === name;
    if (isNameTaken) {
        errors.push({
            formField: "name",
            message: USER_AUTH_ERRORS.name.taken
        });
    }

    const isEmailTaken = conflictingUser.email === email;
    if (isEmailTaken) {
        errors.push({
            formField: "email",
            message: USER_AUTH_ERRORS.email.taken
        });
    }

    return { errors };
};
