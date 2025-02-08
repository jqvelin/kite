import { z } from "zod";

export const LoginFormSchema = z.object({
    nickname: z.string().trim().min(1, "Укажите имя пользователя"),
    password: z.string().min(1, "Введите пароль")
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
