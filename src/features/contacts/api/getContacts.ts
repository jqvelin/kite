import { type UserSearchResult } from "@/entities/user";
import { api } from "@/shared/api";

export const getContacts = (userId: UserSearchResult["id"]) =>
    api
        .get<
            UserSearchResult[]
        >("users", { searchParams: { contactOf: userId } })
        .json();
