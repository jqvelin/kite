import { UserSearchResult } from "@/entities/user";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { useGetContactsQuery } from "../api/useGetContactsQuery";

export const useSearchThroughContactsResult = (
    searchQueryName: UserSearchResult["name"]
) => {
    const { data: session } = useSession();
    const { data: contacts } = useGetContactsQuery(session?.user?.id as string);

    return useMemo(
        () =>
            contacts?.filter((contact) =>
                contact.name?.includes(searchQueryName ?? "")
            ),
        [contacts, searchQueryName]
    );
};
