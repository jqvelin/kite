import { Input } from "@/shared/ui";

import { ChatsList } from "./ChatsList";

export const ChatsTab = () => {
    return (
        <div className="flex-1 flex flex-col items-center p-sm">
            <Input type="search" />
            <ChatsList />
        </div>
    );
};
