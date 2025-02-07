"use client";

import { Button, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginFormSchema, type LoginFormType } from "../model/LoginFormModel";
import { ErrorAlert } from "./ErrorAlert";

export const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<LoginFormType>({
        mode: "onBlur",
        resolver: zodResolver(LoginFormSchema)
    });

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
                />
                <ErrorAlert>{errors.nickname?.message}</ErrorAlert>
            </label>
            <label className="flex flex-col">
                <span>Пароль</span>
                <Input
                    type="password"
                    {...register("password")}
                />
                <ErrorAlert>{errors.password?.message}</ErrorAlert>
            </label>
            <Button className="mb-sm">Войти</Button>
        </form>
    );
};
