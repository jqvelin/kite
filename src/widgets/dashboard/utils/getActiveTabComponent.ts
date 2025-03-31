import { Tab } from "@/entities/tab";

import { ChatsTab } from "../ui/chats/ChatsTab";
import { ContactsTab } from "../ui/contacts/ContactsTab";

export const getActiveTabComponent = (activeTab: Tab) => {
    switch (activeTab) {
        case "contacts": {
            return ContactsTab;
        }
        default: {
            return ChatsTab;
        }
    }
};
