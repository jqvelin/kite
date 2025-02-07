import { Button, Input } from "@/shared/ui";

export const RegistrationForm = () => {
    return (
        <form className="flex flex-col gap-md">
            <label className="flex flex-col">
                <span>Имя пользователя</span>
                <Input type="text" />
            </label>
            <label className="flex flex-col">
                <span>Полное имя</span>
                <Input type="text" />
            </label>
            <label className="flex flex-col">
                <span>Пароль</span>
                <Input type="text" />
            </label>
            <label className="flex flex-col">
                <span>Подтверждение пароля</span>
                <Input type="text" />
            </label>
            <Button className="mb-sm">Зарегистрироваться</Button>
        </form>
    );
};
