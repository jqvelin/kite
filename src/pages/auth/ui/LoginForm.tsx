"use client";

import { LoginFormSchema, type LoginFormType } from "@/features/auth";
import { Button, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { ErrorAlert } from "./ErrorAlert";

export const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<LoginFormType>({
        mode: "onBlur",
        resolver: zodResolver(LoginFormSchema)
    });

    const errors = formState.errors;

    const onSubmit = handleSubmit((data) => signIn("credentials", data));

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
                    aria-invalid={errors.nickname ? "true" : "false"}
                    {...register("nickname")}
                />
                <ErrorAlert>{errors.nickname?.message}</ErrorAlert>
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
            <Button className="mb-sm">Войти</Button>
        </form>
    );
};
