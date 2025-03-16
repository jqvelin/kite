import { UserSearchResult } from "@/entities/user";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export const useSearchContactsQueryData = (
    searchQueryName: UserSearchResult["name"]
) => {
    const queryClient = useQueryClient();

    const contacts = useMemo(
        () =>
            queryClient
                .getQueryData<UserSearchResult[]>(["contacts"])
                ?.filter((contact) => contact.name === searchQueryName),
        [searchQueryName]
    );

    return contacts;
};
