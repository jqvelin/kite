"use client";

import { UserLoginSchema, type UserLoginType } from "@/features/auth";
import { Button, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { ErrorAlert } from "./ErrorAlert";

export const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<UserLoginType>({
        mode: "onBlur",
        resolver: zodResolver(UserLoginSchema)
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
                <span>Электронная почта</span>
                <Input
                    type="text"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email")}
                />
                <ErrorAlert>{errors.email?.message}</ErrorAlert>
            </label>
            <Button className="mb-sm">Войти</Button>
        </form>
    );
};
