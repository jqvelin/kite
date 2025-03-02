import { auth } from "@/features/auth";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ReactNode } from "react";

import { RootStoreProvider } from "./_providers/RootStore";
import "./globals.css";

export const metadata: Metadata = {
    title: "Kite | Свободный мессенджер со сквозным шифрованием",
    description:
        "Общайтесь с родными, друзьями, коллегами в Abyss. E2E шифрование защитит ваши переписки от чужих глаз. Быстро и бесплатно",
    icons: "/favicon.ico"
};

const manrope = Manrope({
    subsets: ["cyrillic", "latin"]
});

export default async function RootLayout({
    children,
    authPage
}: {
    children: ReactNode;
    authPage: ReactNode;
}) {
    const session = await auth();

    return (
        <html lang="ru">
            <body className={manrope.className}>
                <RootStoreProvider>
                    {session ? children : authPage}
                </RootStoreProvider>
            </body>
        </html>
    );
}
