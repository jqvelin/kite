"use client";

import { useGetContactsQuery } from "@/features/contacts";
import { useSession } from "next-auth/react";

import { ContactCard } from "./ContactCard";
import { ContactsNotFound } from "./ContactsNotFound";

export const ContactsList = () => {
    const { data: session } = useSession();
    const { data: contacts } = useGetContactsQuery(session?.user?.id as string);

    return (
        <div className="w-full flex flex-col flex-1">
            {!!contacts?.length ? (
                contacts?.map((contact) => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                    />
                ))
            ) : (
                <ContactsNotFound />
            )}
        </div>
    );
};
