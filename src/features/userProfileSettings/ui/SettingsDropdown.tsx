"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui";
import { SlSettings } from "react-icons/sl";

import { ProfileSettingsDialogTrigger } from "./ProfileSettingsDialogTrigger";

export const SettingsDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger className="aspect-square rounded-full p-2 transition-colors hover:bg-accent/20">
            <SlSettings size="1.5rem" />
        </DropdownMenuTrigger>
        <DropdownMenuContent unmountOnClick={false}>
            <DropdownMenuItem>
                <ProfileSettingsDialogTrigger />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
