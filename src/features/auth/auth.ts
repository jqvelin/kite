import NextAuth from "next-auth";

import { nextAuthConfig } from "./config/nextAuth";

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
