import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email("Некорректная электронная почта!")
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;
