import { type User } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

import { getChats } from "./getChats";

export const useGetChatsQuery = (userId: User["id"]) =>
    useQuery({
        queryKey: ["chats"],
        queryFn: () => getChats(userId),
        staleTime: Infinity
    });
