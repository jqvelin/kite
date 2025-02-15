"use client";

import {
    REGISTRATION_ERRORS,
    UserRegistrationSchema,
    type UserRegistrationType,
    createUser
} from "@/features/auth";
import { Button, Input } from "@/shared/ui";
import { noSSR } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getRandomUsername } from "../utils/getRandomUsername";
import { ErrorAlert } from "./ErrorAlert";

// В форме используются случайные значения -
// отключаем серверный рендеринг, чтобы не возникало ошибок гидрации
export const RegistrationForm = noSSR(() => {
    const { register, formState, handleSubmit, setError } =
        useForm<UserRegistrationType>({
            mode: "onBlur",
            resolver: zodResolver(UserRegistrationSchema)
        });

    const errors = formState.errors;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createUser(data);
        } catch (e) {
            if (!(e instanceof Error)) return;

            if (e.message === REGISTRATION_ERRORS.name.taken) {
                setError("name", {
                    message: "Имя пользователя занято"
                });
            }
        }
    });

    const randomUsername = getRandomUsername();

    return (
        <form
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col gap-md"
        >
            <label className="flex flex-col">
                <span>Имя пользователя</span>
                <Input
                    type="text"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    placeholder={`Как насчёт ${randomUsername}?`}
                />
                <ErrorAlert>{errors.name?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Электронная почта</span>
                <Input
                    type="text"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email")}
                    placeholder={`${randomUsername}@mail.com`}
                />
                <ErrorAlert>{errors.email?.message}</ErrorAlert>
            </label>
            <Button className="mb-sm">Зарегистрироваться</Button>
        </form>
    );
});
