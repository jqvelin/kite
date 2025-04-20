"use client";

import { useRootStore } from "@/app/_providers";
import { UserAvatar, type UserSearchResult } from "@/entities/user";
import { type User } from "@/entities/user";
import { type Chat } from "@/features/chats";
import { addUserToContacts } from "@/features/contacts";
import { Button } from "@/shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { BiPlus } from "react-icons/bi";

type UserCardProps = {
    user: UserSearchResult;
};

export const UserCard = observer(({ user }: UserCardProps) => {
    const { openChat } = useRootStore();
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    const chat: Chat = {
        id: crypto.randomUUID(),
        members: [session?.user, user] as User[],
        messages: [],
        onlineMembers: [session?.user] as User[],
        type: "DIALOG",
        isStarted: false
    };

    const addToContacts = async () => {
        await addUserToContacts(session?.user?.id as string, user.id);
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
    };

    return (
        <div className="flex items-stretch transition-colors hover:bg-accent/20 rounded-md">
            <Button
                onClick={() => openChat(chat)}
                variant="ghost"
                className="hover:bg-transparent flex-1"
            >
                <div className="h-16 flex items-center gap-md px-sm w-full">
                    <UserAvatar avatarSrc={user.image} />
                    <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                        {user.name}
                    </p>
                </div>
            </Button>
            <Button
                onClick={addToContacts}
                variant="ghost"
                className="hover:bg-transparent w-8"
            >
                <BiPlus size="1.5rem" />
            </Button>
        </div>
    );
});
