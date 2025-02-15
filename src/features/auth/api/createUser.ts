"use server";

import { db } from "@/shared/api";

import { signIn } from "../auth";
import { type UserRegistrationType } from "../model/UserRegistrationModel";
import { REGISTRATION_ERRORS } from "../utils/constants";

export const createUser = async (userData: UserRegistrationType) => {
    const { email, name } = userData;

    if (!email) throw new Error(REGISTRATION_ERRORS.email.empty);
    if (!name) throw new Error(REGISTRATION_ERRORS.name.empty);

    if (name.length > 20) {
        throw new Error(REGISTRATION_ERRORS.name.tooLong);
    }

    const isNicknameTaken = await db.user.findFirst({ where: { name } });
    if (isNicknameTaken) {
        throw new Error(REGISTRATION_ERRORS.name.taken);
    }

    const user = await db.user.create({
        data: {
            name,
            email
        }
    });

    await signIn("resend", { name, email });

    return user;
};
