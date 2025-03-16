import { api } from "@/shared/api";

import { UserSearchResult } from "../model/user.type";

export const getUsersByName = async (name: UserSearchResult["name"]) => {
    if (!name) {
        throw new Error("Name is required");
    }

    return api
        .get<UserSearchResult[]>("users", {
            searchParams: {
                name
            }
        })
        .json();
};
