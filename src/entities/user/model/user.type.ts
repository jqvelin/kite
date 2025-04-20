import { type User } from "@prisma/client";

type UserSearchResult = Pick<User, "id" | "name" | "image">;

export type { User, UserSearchResult };
