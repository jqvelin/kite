import { z } from "zod";

import { UserRegistrationFormSchema } from "./userRegistrationForm.schema";

export type UserRegistrationForm = z.infer<typeof UserRegistrationFormSchema>;
