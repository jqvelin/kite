"use client";

import { UserAvatar, type UserSearchResult } from "@/entities/user";
import { removeUserFromContacts } from "@/features/contacts";
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import { BiX } from "react-icons/bi";

import { useChatWithContact } from "../../hooks/useChatWithContact";

type ContactCardProps = {
    contact: UserSearchResult;
};

export const ContactCard = observer(({ contact }: ContactCardProps) => {
    const { data: session } = useSession();

    const queryClient = useQueryClient();

    const openChatWithContact = useChatWithContact(contact);

    const removeFromContacts = async () => {
        await removeUserFromContacts(session?.user?.id as string, contact.id);
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
    };

    return (
        <div className="flex items-stretch transition-colors hover:bg-accent/20 rounded-md">
            <Button
                key={contact.id}
                variant="ghost"
                className="hover:bg-transparent flex-1"
                onClick={openChatWithContact}
            >
                <div className="h-16 flex items-center gap-md px-sm w-full">
                    <UserAvatar avatarSrc={contact.image} />
                    <p className="font-semibold text-lg md:text-xl whitespace-nowrap overflow-hidden max-w-32 overflow-ellipsis">
                        {contact.name}
                    </p>
                </div>
            </Button>

            <Dialog>
                <DialogTrigger className="hover:bg-transparent hover:text-destructive w-8">
                    <BiX size="1.5rem" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        Удалить <strong>{contact.name}</strong> из контактов?
                    </DialogHeader>
                    <div className="flex-1 flex flex-col items-center">
                        <p className="font-semibold text-lg my-auto">
                            Это действие необратимо
                        </p>
                        <div className="flex items-center gap-md mt-auto">
                            <DialogTrigger className="bg-transparent text-primary transition-colors rounded-md hover:bg-accent/20 py-sm px-md">
                                Отмена
                            </DialogTrigger>
                            <DialogTrigger
                                onClick={removeFromContacts}
                                className="bg-destructive text-background rounded-md py-sm px-md"
                            >
                                Удалить
                            </DialogTrigger>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* <Button
                onClick={removeFromContacts}
                variant="ghost"
                className="hover:bg-transparent hover:text-destructive w-8"
            >
                <BiX size="1.5rem" />
            </Button> */}
        </div>
    );
});
