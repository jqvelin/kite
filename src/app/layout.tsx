import type { Metadata } from "next";
import { Manrope } from "next/font/google";

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

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={manrope.className}>{children}</body>
        </html>
    );
}
