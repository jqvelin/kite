"use server";

import { db } from "@/shared/api";
import bcrypt from "bcryptjs";

import { signIn } from "../auth";
import { type RegistrationFormType } from "../model/RegistrationFormModel";
import { BCRYPT_SALT_ROUNDS, REGISTRATION_ERRORS } from "../utils/constants";

export const createUser = async (userData: RegistrationFormType) => {
    const { nickname, fullName, password } = userData;

    if (!nickname) throw new Error(REGISTRATION_ERRORS.nickname.empty);
    if (!fullName) throw new Error(REGISTRATION_ERRORS.fullName.empty);
    if (!password) throw new Error(REGISTRATION_ERRORS.password.empty);

    if (nickname.length > 20) {
        throw new Error(REGISTRATION_ERRORS.nickname.tooLong);
    } else if (password.length < 8) {
        throw new Error(REGISTRATION_ERRORS.password.tooShort);
    }

    const isNicknameTaken = await db.user.findFirst({ where: { nickname } });
    if (isNicknameTaken) {
        throw new Error(REGISTRATION_ERRORS.nickname.taken);
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await db.user.create({
        data: {
            nickname,
            fullName,
            password: passwordHash
        }
    });

    await signIn("credentials", { nickname, password });

    return user;
};
