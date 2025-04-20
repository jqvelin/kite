import { type UserSearchResult } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

import { getContacts } from "./getContacts";

export const useGetContactsQuery = (userId: UserSearchResult["id"]) =>
    useQuery({
        queryKey: ["contacts"],
        queryFn: () => getContacts(userId),
        staleTime: Infinity
    });
