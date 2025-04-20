import { z } from "zod";

import { MessageFormSchema } from "./MessageForm.schema";

export type MessageForm = z.infer<typeof MessageFormSchema>;
