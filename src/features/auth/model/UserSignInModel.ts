import { z } from "zod";

export const UserSignInSchema = z.object({
    email: z.string().email("Некорректная электронная почта!")
});

export type UserSignInType = z.infer<typeof UserSignInSchema>;
