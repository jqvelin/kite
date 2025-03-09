import { z } from "zod";

import { UserSignInFormSchema } from "./userSignInForm.schema";

export type UserSignInForm = z.infer<typeof UserSignInFormSchema>;
