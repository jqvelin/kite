import { SEND_MESSAGE_ERRORS } from "@/features/chats";
import { z } from "zod";

export const MessageFormSchema = z.object({
    body: z
        .string()
        .min(1, SEND_MESSAGE_ERRORS.message.empty)
        .max(500, SEND_MESSAGE_ERRORS.message.tooLong)
});
