"use client";

import { useRootStore } from "@/app/_providers";
import { ChatWindow } from "@/widgets/chatWindow";
import { useIsViewportNarrow } from "@/widgets/chatWindow";
import { Dashboard } from "@/widgets/dashboard";
import { observer } from "mobx-react-lite";

export const Homepage = observer(() => {
    const { currentChat } = useRootStore();

    const isViewportNarrow = useIsViewportNarrow();

    return (
        <>
            {currentChat && isViewportNarrow ? null : <Dashboard />}
            <ChatWindow />
        </>
    );
});
