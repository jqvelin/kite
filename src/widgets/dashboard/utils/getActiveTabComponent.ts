import { Tab } from "@/entities/tab";
import { ChatsTab } from "@/features/chats";
import { ContactsTab } from "@/features/contacts";

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
