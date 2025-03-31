import { UserSearchResult } from "@/entities/user";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useSplitSearchContactsResults = (
    contacts: UserSearchResult[],
    unfilteredUsers: UserSearchResult[]
) => {
    const { data: session } = useSession();

    return useMemo(
        () =>
            unfilteredUsers?.filter(
                (user) =>
                    !contacts?.some((contact) => contact.id === user.id) &&
                    user.id !== session?.user?.id
            ),
        [contacts, unfilteredUsers, session?.user?.id]
    );
};
