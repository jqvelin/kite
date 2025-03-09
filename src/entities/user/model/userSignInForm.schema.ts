import { z } from "zod";

export const UserSignInFormSchema = z.object({
    email: z.string().email("Некорректная электронная почта!")
});
