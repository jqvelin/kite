"use client";

import { useRootStore } from "@/app/_providers";
import { Button, ErrorAlert } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSend } from "react-icons/bi";

import { MessageFormSchema } from "../model/MessageForm.schema";
import { MessageForm } from "../model/MessageForm.type";

export const ChatWindowMessageForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<MessageForm>({
        resolver: zodResolver(MessageFormSchema)
    });
    const { data: session } = useSession();
    const { sendMessage } = useRootStore();
    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<MessageForm> = async (message) => {
        await sendMessage(session?.user?.id as string, message);
        queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    return (
        <form
            className="flex items-center gap-md"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full flex flex-col mt-auto relative">
                <textarea
                    {...register("body")}
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
};
