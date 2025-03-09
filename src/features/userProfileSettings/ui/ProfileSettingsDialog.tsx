"use client";

import { useSession } from "next-auth/react";

import { ChangeUsernameSetting } from "./ChangeUsernameSetting";

export const ProfileSettingsDialog = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col">
            <ChangeUsernameSetting session={session} />
        </div>
    );
};
