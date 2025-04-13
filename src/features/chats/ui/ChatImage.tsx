"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ComponentPropsWithRef } from "react";
import { BiUser } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

import { type Chat } from "../model/Chat.type";

type ChatImageProps = ComponentPropsWithRef<"image" | "svg"> & {
    chat: Chat;
};

export const ChatImage = ({ chat, className, ...props }: ChatImageProps) => {
    const { data: session } = useSession();

    if (chat.type === "GROUP") {
        return (
            <FiUsers
                size="3rem"
                className={["shrink-0", className].join(" ")}
                {...props}
            />
        );
    }

    const chatter = chat.members.find(
        (member) => member.id !== session?.user?.id
    )!;

    if (chatter.image) {
        return (
            <Image
                src={chatter.image}
                alt="Картинка чата"
                width={50}
                height={50}
                className={["shrink-0", "rounded-full", className].join(" ")}
            />
        );
    }

    return (
        <BiUser
            size="3rem"
            className={["shrink-0", className].join(" ")}
            {...props}
        />
    );
};
