import { type User } from "@/entities/user";
import { db } from "@/shared/api";

// Создаём чат с ИИ-чатботом для каждого нового зарегистрированного пользователя,
// чтобы можно было сразу проверить работу приложения
// на примере общения с ним.
export const createChatWithLlama = async (user: User) => {
    const chat = await db.chat.create({
        data: {
            members: {
                connect: [user, { id: process.env.NEXT_PUBLIC_LLAMA_USER_ID }]
            },
            messages: {
                create: {
                    body: "Hello! Feel free to text me to try this app out",
                    sentById: process.env.NEXT_PUBLIC_LLAMA_USER_ID as string
                }
            }
        }
    });

    return chat;
};
