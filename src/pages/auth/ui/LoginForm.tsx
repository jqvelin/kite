import { Button, Input } from "@/shared/ui";

export const LoginForm = () => {
    return (
        <form className="flex flex-col gap-md">
            <label className="flex flex-col">
                <span>Имя пользователя</span>
                <Input type="text" />
            </label>
            <label className="flex flex-col">
                <span>Пароль</span>
                <Input type="text" />
            </label>
            <Button className="mb-sm">Войти</Button>
        </form>
    );
};
