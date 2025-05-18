"use client";

import { useRootStore } from "@/app/_providers";
import { useEvent } from "@/shared/hooks";
import { Button, ErrorAlert } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { useCallback, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSend } from "react-icons/bi";

import { MessageFormSchema } from "../model/MessageForm.schema";
import { MessageForm } from "../model/MessageForm.type";
import { KEYDOWN_EVENT_CONSTRAINTS } from "../utils/constants";

export const ChatWindowMessageForm = observer(() => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm<MessageForm>({
        resolver: zodResolver(MessageFormSchema)
    });
    const { data: session } = useSession();
    const { sendMessage } = useRootStore();

    const onSubmit: SubmitHandler<MessageForm> = useCallback(
        async (message) => {
            setValue("body", "");
            await sendMessage(session?.user?.id as string, message.body);
        },
        [session?.user?.id, sendMessage, setValue]
    );

    // Для отслеживания поля в useForm
    // вместе с кастомной обработкой событий
    const { ref: rhfRef, ...attributes } = register("body");
    const customRef = useRef<HTMLTextAreaElement>(null);

    const handleEnterPress = useCallback(
        (e: KeyboardEvent) => {
            // Отменяем перенос строки и отправляем сообщение
            e.preventDefault();

            handleSubmit(onSubmit)();
        },
        [handleSubmit, onSubmit]
    );

    useEvent<KeyboardEvent>(
        "keydown",
        handleEnterPress,
        KEYDOWN_EVENT_CONSTRAINTS
    );

    return (
        <form
            className="flex items-center gap-md"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full flex flex-col mt-auto relative">
                <textarea
                    ref={(e) => {
                        rhfRef(e);
                        customRef.current = e;
                    }}
                    {...attributes}
                    className={`${errors.body?.message ? "border-destructive/50" : "border-accent/50"} outline-accent border-2 resize-none p-sm rounded-md w-full`}
                    rows={1}
                    placeholder="Сообщение"
                ></textarea>
                <ErrorAlert className="absolute top-0 -translate-y-[calc(100%+3px)]">
                    {errors.body?.message}
                </ErrorAlert>
            </div>
            <Button
                disabled={!watch("body")?.length}
                variant="ghost"
                className="h-full aspect-square rounded-full flex items-center justify-center"
            >
                <BiSend size="1.5rem" />
            </Button>
        </form>
    );
});
