"use client";

import { UserAvatar, type UserSearchResult } from "@/entities/user";
import { Button } from "@/shared/ui";

type ContactCardProps = {
    contact: UserSearchResult;
};

export const ContactCard = ({ contact }: ContactCardProps) => {
    return (
        <Button
            key={contact.id}
            variant="ghost"
            className="w-full"
        >
            <div className="h-16 flex items-center gap-md px-sm w-full">
                <UserAvatar avatarSrc={contact.image} />
                <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                    {contact.name}
                </p>
            </div>
        </Button>
    );
};
