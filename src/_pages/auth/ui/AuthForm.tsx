"use client";

import {
    UserRegistrationSchema,
    type UserRegistrationType,
    authenticateUser,
    createUser
} from "@/features/auth";
import { UserSignInSchema, type UserSignInType } from "@/features/auth";
import { Button, Input } from "@/shared/ui";
import { noSSR } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { getRandomUsername } from "../utils/getRandomUsername";
import { ErrorAlert } from "./ErrorAlert";

// Компонент позволяет переключаться между формами регистрации и входа,
// а при успешной отправке верификационного письма скрывается.
// Здесь же содержатся соответствующие компоненты RegistrationForm и SignInForm

type AuthFormProps = {
    setIsMagicLinkSent: (nextIsMagicLinkSent: boolean) => void;
};

export const AuthForm = ({ setIsMagicLinkSent }: AuthFormProps) => {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleIsRegistering = () => setIsRegistering(!isRegistering);

    return (
        <div>
            {isRegistering ? (
                <RegistrationForm setIsMagicLinkSent={setIsMagicLinkSent} />
            ) : (
                <SignInForm setIsMagicLinkSent={setIsMagicLinkSent} />
            )}
            <div className="text-center">
                <span>
                    {isRegistering ? "Уже зарегистрированы?" : "Нет аккаунта?"}
                    &nbsp;
                </span>
                <Button
                    onClick={toggleIsRegistering}
                    variant="link"
                >
                    {isRegistering ? "Войти" : "Зарегистрироваться"}
                </Button>
            </div>
        </div>
    );
};

export const SignInForm = ({ setIsMagicLinkSent }: AuthFormProps) => {
    const { register, handleSubmit, formState, setError } =
        useForm<UserSignInType>({
            mode: "onTouched",
            resolver: zodResolver(UserSignInSchema)
        });

    const formErrors = formState.errors;

    const onSubmit = handleSubmit(async (data) => {
        const response = await authenticateUser(data);
        if (response?.errors) {
            response.errors.forEach((error) => {
                setError(error.formField, { message: error.message });
            });
        } else {
            // Cross-fade анимация перехода от формы
            // к сообщению об отправленном верификационном письме

            // Переход без анимации для браузеров,
            // не поддерживающих View Transition API
            if (!document.startViewTransition) {
                setIsMagicLinkSent(true);
                return;
            }

            document.startViewTransition(() => setIsMagicLinkSent(true));
        }
    });

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
                    aria-invalid={formErrors.email ? "true" : "false"}
                    {...register("email")}
                />
                <ErrorAlert>{formErrors.email?.message}</ErrorAlert>
            </label>
            <Button className="mb-sm">Войти</Button>
        </form>
    );
};

// В форме используются случайные значения -
// отключаем серверный рендеринг, чтобы не возникало ошибок гидрации
export const RegistrationForm = noSSR<AuthFormProps>(
    ({ setIsMagicLinkSent }: AuthFormProps) => {
        const { register, formState, handleSubmit, setError } =
            useForm<UserRegistrationType>({
                mode: "onTouched",
                resolver: zodResolver(UserRegistrationSchema)
            });

        const formErrors = formState.errors;

        const onSubmit = handleSubmit(async (data) => {
            const response = await createUser(data);

            if (response.errors) {
                response.errors.forEach((error) => {
                    setError(error.formField, { message: error.message });
                });
            } else {
                // Cross-fade анимация перехода от формы
                // к сообщению об отправленном верификационном письме

                // Переход без анимации для браузеров,
                // не поддерживающих View Transition API
                if (!document.startViewTransition) {
                    setIsMagicLinkSent(true);
                    return;
                }

                document.startViewTransition(() => setIsMagicLinkSent(true));
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
                        aria-invalid={formErrors.name ? "true" : "false"}
                        placeholder={`Как насчёт ${randomUsername}?`}
                    />
                    <ErrorAlert>{formErrors.name?.message}</ErrorAlert>
                </label>
                <label className="flex flex-col">
                    <span>Электронная почта</span>
                    <Input
                        type="text"
                        aria-invalid={formErrors.email ? "true" : "false"}
                        {...register("email")}
                        placeholder={`${randomUsername}@mail.com`}
                    />
                    <ErrorAlert>{formErrors.email?.message}</ErrorAlert>
                </label>
                <Button className="mb-sm">Зарегистрироваться</Button>
            </form>
        );
    }
);
