"use client";

import { Input } from "@/shared/ui";
import { useState } from "react";

import { ContactsList } from "./ContactsList";
import { SearchContactsResultsList } from "./SearchContactsResultsList";

export const ContactsTab = () => {
    const [searchQueryName, setSearchQueryName] = useState("");

    return (
        <div className="flex-1 flex flex-col items-center p-sm">
            <Input
                type="search"
                value={searchQueryName}
                onChange={(e) => setSearchQueryName(e.target.value)}
                className="mb-md"
            />
            {searchQueryName ? (
                <SearchContactsResultsList searchQueryName={searchQueryName} />
            ) : (
                <ContactsList />
            )}
        </div>
    );
};
