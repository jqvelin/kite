"use client";

import { User } from "@/entities/user";
import {
    type UserRegistrationForm,
    UserRegistrationFormSchema
} from "@/entities/user";
import { ErrorAlert } from "@/shared/ui";
import { Button, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { CgCheck } from "react-icons/cg";

import { changeUsername } from "../api/changeUsername";

type ChangeUsernameFormProps = {
    userId: User["id"];
    initialName: string;
    afterSubmit: () => void;
};

export const ChangeUsernameForm = ({
    userId,
    initialName,
    afterSubmit
}: ChangeUsernameFormProps) => {
    const { update: updateSession } = useSession();
    const { register, formState, handleSubmit, setError } = useForm<
        Pick<UserRegistrationForm, "name">
    >({
        mode: "onTouched",
        defaultValues: {
            name: initialName
        },
        resolver: zodResolver(UserRegistrationFormSchema.pick({ name: true }))
    });

    const formErrors = formState.errors;

    const onSubmit = handleSubmit(async (data) => {
        if (data.name === initialName) return;

        const response = await changeUsername(userId, data.name);

        if (response.error) {
            setError("name", {
                message: response.error.message
            });
        } else {
            updateSession({ name: data.name });
            afterSubmit();
        }
    });

    return (
        <form
            noValidate
            onSubmit={onSubmit}
            className="flex items-center gap-md w-full"
        >
            <label className="flex flex-col">
                <Input
                    type="text"
                    {...register("name")}
                    aria-invalid={formErrors.name ? "true" : "false"}
                />
                <ErrorAlert>{formErrors.name?.message}</ErrorAlert>
            </label>
            <Button
                variant="ghost"
                className="mb-sm"
            >
                <CgCheck size="2rem" />
            </Button>
        </form>
    );
};
