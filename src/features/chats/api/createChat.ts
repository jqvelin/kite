"use server";

import { db } from "@/shared/api";

import { type Chat } from "../model/Chat.type";
import { CreateChatInfo } from "../model/CreateChatInfo.type";

export const createChat = async ({
    memberIds
}: CreateChatInfo): Promise<Chat> => {
    const chat = await db.chat.create({
        data: {
            members: {
                connect: memberIds.map((id) => ({ id }))
            }
        },
        include: {
            members: true,
            messages: true
        }
    });

    return chat;
};
