import { z } from "zod";

export const UserRegistrationSchema = z.object({
    name: z.string().trim().min(1, "Имя пользователя обязательно!"),
    email: z.string().email("Некорректная электронная почта!")
});

export type UserRegistrationType = z.infer<typeof UserRegistrationSchema>;
