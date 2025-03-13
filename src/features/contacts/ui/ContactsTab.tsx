"use client";

import { type User, UserAvatar } from "@/entities/user";
import { useDebouncedValue } from "@/shared/hooks";
import { Button, Input } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";

const api = ky.create({
    prefixUrl: "/api"
});

const getUsersByName = async (name: User["name"]) => {
    if (!name) {
        throw new Error("Name is required");
    }

    return api
        .get<User[]>("users", {
            searchParams: {
                name
            }
        })
        .json();
};

const useGetUsersByName = (name: User["name"]) =>
    useQuery({
        queryKey: [`users?name=${name}`],
        enabled: !!name,
        queryFn: () => getUsersByName(name)
    });

export const ContactsTab = () => {
    const [searchQueryName, setSearchQueryName] = useState("");

    const debouncedSearchQueryName = useDebouncedValue(searchQueryName, 500);

    const {
        data: users,
        isFetching,
        isFetched
    } = useGetUsersByName(debouncedSearchQueryName);

    return (
        <div className="flex-1 flex flex-col items-center p-sm">
            <Input
                type="search"
                value={searchQueryName}
                onChange={(e) => setSearchQueryName(e.target.value)}
                className="mb-md"
            />
            {isFetched ? (
                <div className="w-full h-full flex flex-col">
                    {users?.length ? (
                        <SearchUsersResultsList users={users} />
                    ) : (
                        <ContactsNotFound />
                    )}
                </div>
            ) : isFetching ? (
                <div>Loading...</div>
            ) : (
                <div>Контакты</div>
            )}
        </div>
    );
};

const ContactsNotFound = () => (
    <div className="flex flex-col items-center text-center my-auto">
        <FiUsers className="size-12 md:size-16 xl:size-18 mb-md" />
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold mb-sm">
            Никого не найдено
        </h3>
        <h4 className="font-medium">Попробуйте изменить запрос</h4>
    </div>
);

type SearchUsersResultsListProps = {
    users: User[];
};

const SearchUsersResultsList = ({ users }: SearchUsersResultsListProps) => (
    <div>
        <p className="font-medium mb-sm">Глобальный поиск</p>
        {users?.map((user) => (
            <Button
                key={user.id}
                variant="ghost"
                className="w-full"
            >
                <div className="h-16 flex items-center gap-md px-sm w-full">
                    <UserAvatar avatarSrc={user.image} />
                    <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                        {user.name}
                    </p>
                </div>
            </Button>
        ))}
    </div>
);
