"use client";

import { type User, useGetUsersByNameQuery } from "@/entities/user";
import { useSearchThroughContactsResult } from "@/features/contacts";
import { useSearchUsersGloballyResult } from "@/features/contacts";
import { useDebouncedValue } from "@/shared/hooks";

import { ContactCard } from "./ContactCard";
import { ContactsListSkeleton } from "./ContactsListSkeleton";
import { UserCard } from "./UserCard";
import { UsersNotFound } from "./UsersNotFound";

type SearchContactsResultsListProps = {
    searchQueryName: User["name"];
};

export const SearchContactsResultsList = ({
    searchQueryName
}: SearchContactsResultsListProps) => {
    const debouncedSearchQueryName = useDebouncedValue(searchQueryName, 500);

    const { data: unfilteredUsers, isPending } = useGetUsersByNameQuery(
        debouncedSearchQueryName
    );

    const contacts = useSearchThroughContactsResult(searchQueryName);

    const users = useSearchUsersGloballyResult(
        contacts ?? [],
        unfilteredUsers ?? []
    );

    if (isPending) {
        return <ContactsListSkeleton />;
    }

    return (
        <div className="w-full flex flex-col flex-1">
            {!!contacts?.length && (
                <div>
                    <p className="font-medium mb-sm">Контакты</p>
                    {contacts?.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                        />
                    ))}
                </div>
            )}
            {!!users?.length && (
                <div>
                    <p className="font-medium mb-sm">Глобальный поиск</p>
                    {users?.map((user) => (
                        <UserCard
                            user={user}
                            key={user.id}
                        />
                    ))}
                </div>
            )}
            {!contacts?.length && !users?.length && <UsersNotFound />}
        </div>
    );
};
