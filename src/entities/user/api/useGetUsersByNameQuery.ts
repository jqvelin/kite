import { useQuery } from "@tanstack/react-query";

import { type UserSearchResult } from "../model/user.type";
import { getUsersByName } from "./getUsersByName";

export const useGetUsersByNameQuery = (name: UserSearchResult["name"]) =>
    useQuery({
        queryKey: [`users?name=${name}`],
        enabled: !!name,
        refetchOnWindowFocus: false,
        queryFn: () => getUsersByName(name)
    });
