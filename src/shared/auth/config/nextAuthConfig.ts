import { db } from "@/shared/api";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

import { getVerificationEmailHtml } from "../utils/getVerificationEmailHtml";
import { getVerificationEmailText } from "../utils/getVerificationEmailText";

export const nextAuthConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    providers: [
        Resend({
            apiKey: process.env.AUTH_RESEND_KEY,
            from: "kite-noreply@mailing.jqvelin.ru",
            async sendVerificationRequest({
                identifier: email,
                provider,
                url
            }) {
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${provider.apiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        from: provider.from,
                        to: email,
                        subject: `Вход в аккаунт Kite`,
                        html: getVerificationEmailHtml(url),
                        // Fallback на случай, если почтовый клиент пользователя
                        // не поддерживает CSS
                        text: getVerificationEmailText(url)
                    })
                });

                if (!res.ok)
                    throw new Error(
                        "Resend error: " + JSON.stringify(await res.json())
                    );
            }
        })
    ],
    callbacks: {
        // useSession возвращает лишь часть полей по умолчанию.
        // Заставляем его возвращать полную сессию.
        session({ session }) {
            return session;
        }
    }
};
