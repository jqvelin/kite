import { db } from "@/shared/api";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

export const nextAuthConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    providers: [
        Resend({
            apiKey: process.env.AUTH_RESEND_KEY,
            from: "kite-noreply@mailing.jqvelin.ru"
        })
    ]
};
