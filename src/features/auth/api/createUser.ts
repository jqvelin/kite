"use server";

import { db } from "@/shared/api";

import { signIn } from "../auth";
import { RegistrationResponse } from "../model/AuthResponse.type";
import { type UserRegistrationType } from "../model/UserRegistrationModel";
import { AUTH_ERRORS } from "../utils/constants";

export const createUser = async (
    userData: UserRegistrationType
): Promise<RegistrationResponse> => {
    const { email, name } = userData;

    const errors: RegistrationResponse["errors"] = [];

    if (!email)
        errors.push({ formField: "email", message: AUTH_ERRORS.email.empty });
    if (!name)
        errors.push({ formField: "name", message: AUTH_ERRORS.name.empty });

    if (name.length > 20) {
        errors.push({ formField: "name", message: AUTH_ERRORS.name.tooLong });
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

        await signIn("resend", { email, redirect: false });

        return { user };
    }

    const isNameTaken = conflictingUser.name === name;
    if (isNameTaken) {
        errors.push({ formField: "name", message: AUTH_ERRORS.name.taken });
    }

    const isEmailTaken = conflictingUser.email === email;
    if (isEmailTaken) {
        errors.push({ formField: "email", message: AUTH_ERRORS.email.taken });
    }

    return { errors };
};
