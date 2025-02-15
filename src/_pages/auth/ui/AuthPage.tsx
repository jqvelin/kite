"use client";

import { KiteAnimation } from "@/shared/ui";
import { useState } from "react";

import { AuthForm } from "./AuthForm";
import { MagicLinkSentMessage } from "./MagicLinkSentMessage";

export const AuthPage = () => {
    const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

    return (
        <main className="flex items-center justify-center gap-md">
            <KiteAnimation />
            <div className="p-md rounded-lg shadow-md bg-background">
                <div className="mb-4">
                    <h1 className="text-accent text-xl font-bold">
                        Добро пожаловать в Kite!
                    </h1>
                    <h2 className="font-medium">
                        Безопасное общение ждёт, осталась лишь пара шагов...
                    </h2>
                </div>
                {isMagicLinkSent ? (
                    <MagicLinkSentMessage />
                ) : (
                    <AuthForm setIsMagicLinkSent={setIsMagicLinkSent} />
                )}
            </div>
        </main>
    );
};
