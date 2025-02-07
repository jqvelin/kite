"use client";

import { Button, Input } from "@/shared/ui";
import { noSSR } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    RegistrationFormSchema,
    RegistrationFormType
} from "../model/RegistrationFormModel";
import { getRandomUsername } from "../utils/getRandomUsername";
import { ErrorAlert } from "./ErrorAlert";

// В форме используются случайные значения -
// отключаем серверный рендеринг, чтобы не возникало ошибок гидрации
export const RegistrationForm = noSSR(() => {
    const { register, handleSubmit, formState } = useForm<RegistrationFormType>(
        {
            mode: "onBlur",
            resolver: zodResolver(RegistrationFormSchema)
        }
    );

    const errors = formState.errors;

    const onSubmit = handleSubmit((data) => console.log(data));

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
                    placeholder={`Как насчёт ${getRandomUsername()}?`}
                />
                <ErrorAlert>{errors.nickname?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Полное имя</span>
                <Input
                    type="text"
                    {...register("fullName")}
                />
                <ErrorAlert>{errors.fullName?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Пароль</span>
                <Input
                    type="password"
                    {...register("password")}
                />
                <ErrorAlert>{errors.password?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Подтверждение пароля</span>
                <Input
                    type="password"
                    {...register("confirmPassword")}
                />
                <ErrorAlert>{errors.confirmPassword?.message}</ErrorAlert>
            </label>
            <Button className="mb-sm">Зарегистрироваться</Button>
        </form>
    );
});
