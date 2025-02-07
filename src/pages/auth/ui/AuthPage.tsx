import { Button, KiteAnimation } from "@/shared/ui";

import { LoginForm } from "./LoginForm";

// TODO: animate header slide up and auth form appearance using motion
export const AuthPage = () => (
    <div className="flex items-center justify-center gap-md">
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
            <LoginForm />
            <div className="text-center">
                <span className="text-center">Нет аккаунта?&nbsp;</span>
                <Button variant="link">Зарегистрироваться</Button>
            </div>
        </div>
    </div>
);
