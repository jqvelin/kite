"use client";

import { KiteIcon } from "@/shared/ui";

import { SettingsDropdown } from "./SettingsDropdown";

export const SidebarHeader = () => {
    return (
        <div className="flex items-center justify-between w-full px-sm py-md border-b-1">
            <div className="flex items-center gap-sm">
                <KiteIcon size="2rem" />
                <span className="text-accent font-bold text-xl">Kite</span>
            </div>
            <SettingsDropdown />
        </div>
    );
};
