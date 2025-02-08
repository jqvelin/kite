import { z } from "zod";

export const RegistrationFormSchema = z
    .object({
        nickname: z.string().trim().min(1, "Имя пользователя обязательно!"),
        fullName: z.string().trim().min(1, "Полное имя обязательно!"),
        password: z.string().min(8, "Не менее 8 символов!"),
        confirmPassword: z.string().min(8, "Не менее 8 символов!")
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Пароли не совпадают!",
                path: ["confirmPassword"]
            });
        }
    });

export type RegistrationFormType = z.infer<typeof RegistrationFormSchema>;
