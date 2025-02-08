"use client";

import {
    REGISTRATION_ERRORS,
    RegistrationFormSchema,
    RegistrationFormType,
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
        useForm<RegistrationFormType>({
            mode: "onBlur",
            resolver: zodResolver(RegistrationFormSchema)
        });

    const errors = formState.errors;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createUser(data);
        } catch (e) {
            if (!(e instanceof Error)) return;

            if (e.message === REGISTRATION_ERRORS.nickname.taken) {
                setError("nickname", {
                    message: "Имя пользователя занято"
                });
            }
        }
    });

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
                    {...register("nickname")}
                    aria-invalid={errors.nickname ? "true" : "false"}
                    placeholder={`Как насчёт ${getRandomUsername()}?`}
                />
                <ErrorAlert>{errors.nickname?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Полное имя</span>
                <Input
                    type="text"
                    aria-invalid={errors.fullName ? "true" : "false"}
                    {...register("fullName")}
                />
                <ErrorAlert>{errors.fullName?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Пароль</span>
                <Input
                    type="password"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password")}
                />
                <ErrorAlert>{errors.password?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Подтверждение пароля</span>
                <Input
                    type="password"
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    {...register("confirmPassword")}
                />
                <ErrorAlert>{errors.confirmPassword?.message}</ErrorAlert>
            </label>
            <Button className="mb-sm">Зарегистрироваться</Button>
        </form>
    );
});
