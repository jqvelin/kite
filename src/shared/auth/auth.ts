import NextAuth from "next-auth";

import { nextAuthConfig } from "./config/nextAuthConfig";

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
