"use client";

import { AuthOption } from "@/features/auth";
import { Button, KiteAnimation } from "@/shared/ui";
import { useState } from "react";

import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

export const AuthPage = () => {
    const [authOption, setAuthOption] = useState<AuthOption>("login");

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
                {authOption === "login" ? <LoginForm /> : <RegistrationForm />}
                <div className="text-center">
                    <span className="text-center">
                        {authOption === "login"
                            ? "Нет аккаунта?"
                            : "Уже зарегистрированы?"}
                        &nbsp;
                    </span>
                    <Button
                        onClick={() =>
                            setAuthOption(
                                authOption === "login"
                                    ? "registration"
                                    : "login"
                            )
                        }
                        variant="link"
                    >
                        {authOption === "login"
                            ? "Зарегистрироваться"
                            : "Войти"}
                    </Button>
                </div>
            </div>
        </main>
    );
};
