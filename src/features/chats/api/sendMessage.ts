"use server";

import { db } from "@/shared/api";
import { auth } from "@/shared/auth";

import { Chat } from "../model/Chat.type";
import { Message } from "../model/Message.type";
import { SendMessageResponse } from "../model/SendMessageResponse.type";
import { SEND_MESSAGE_ERRORS } from "../utils/constants";

export const sendMessage = async (
    chatId: Chat["id"],
    message: Message
): Promise<SendMessageResponse> => {
    const session = await auth();

    try {
        if (!message.body.length) {
            return {
                error: {
                    message: SEND_MESSAGE_ERRORS.message.empty
                }
            };
        }

        if (message.body.length > 500) {
            return {
                error: {
                    message: SEND_MESSAGE_ERRORS.message.tooLong
                }
            };
        }

        const createdMessage = await db.message.create({
            data: {
                ...message,
                chatId,
                sentById: session?.user?.id as string
            }
        });

        return { message: createdMessage };
    } catch {
        console.log(
            `Failed to send message of ${session?.user?.id} to ${chatId}`
        );

        return {
            error: {
                message: "Unknown error"
            }
        };
    }
};
