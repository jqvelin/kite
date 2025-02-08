import { db } from "@/shared/api";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { REGISTRATION_ERRORS } from "../utils/constants";

export const nextAuthConfig: NextAuthConfig = {
    providers: [
        Credentials({
            credentials: {
                nickname: {},
                password: {}
            },
            authorize: async (credentials) => {
                console.log(`AUTHENTICATING`);
                const { nickname, password } = credentials as {
                    [key: string]: string;
                };

                const user = await db.user.findFirst({
                    where: { nickname }
                });

                if (!user) {
                    throw new Error(REGISTRATION_ERRORS.credentials.invalid);
                }

                const isPasswordCorrect = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error(REGISTRATION_ERRORS.credentials.invalid);
                }

                return user;
            }
        })
    ]
};
