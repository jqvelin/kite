import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/shared/ui";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BiUser } from "react-icons/bi";

import { ProfileSettingsDialog } from "./ProfileSettingsDialog";

export const ProfileSettingsDialogTrigger = () => {
    const { data: session } = useSession();

    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-sm">
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        width={50}
                        height={50}
                        alt="Аватар"
                    />
                ) : (
                    <BiUser size="1.125rem" />
                )}
                {session?.user?.name}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Профиль</DialogHeader>
                <ProfileSettingsDialog />
            </DialogContent>
        </Dialog>
    );
};
