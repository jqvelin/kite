"use server";

import { db } from "@/shared/api";
import { auth } from "@/shared/auth";

import { Chat } from "../model/Chat.type";
import { Message } from "../model/Message.type";
import { SendMessageResponse } from "../model/SendMessageResponse.type";
import { SEND_MESSAGE_ERRORS } from "../utils/constants";

export const sendMessage = async (
    chatId: Chat["id"],
    messageBody: Message["body"]
): Promise<SendMessageResponse> => {
    const session = await auth();

    try {
        if (!messageBody.length) {
            return {
                error: {
                    message: SEND_MESSAGE_ERRORS.message.empty
                }
            };
        }

        if (messageBody.length > 500) {
            return {
                error: {
                    message: SEND_MESSAGE_ERRORS.message.tooLong
                }
            };
        }

        const createdMessage = await db.message.create({
            data: {
                body: messageBody,
                chatId,
                sentById: session?.user?.id as string
            }
        });

        return { message: createdMessage };
    } catch (e) {
        console.log(e);

        return {
            error: {
                message: "Unknown error"
            }
        };
    }
};
