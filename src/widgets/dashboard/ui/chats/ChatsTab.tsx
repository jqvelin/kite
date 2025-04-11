"use client";

import { useRootStore } from "@/app/_providers";
import { Input } from "@/shared/ui";
import { observer } from "mobx-react-lite";

import { ChatsList } from "./ChatsList";

export const ChatsTab = observer(() => {
    const { dashboardStore } = useRootStore();
    return (
        <div className="flex-1 flex flex-col items-center p-sm">
            <Input
                type="search"
                value={dashboardStore.chatsSearchQuery}
                onChange={(e) =>
                    dashboardStore.setChatsSearchQuery(e.target.value)
                }
                className="mb-md"
            />
            <ChatsList />
        </div>
    );
});
