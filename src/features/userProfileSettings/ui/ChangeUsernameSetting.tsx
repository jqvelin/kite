"use client";

import { UserAvatar } from "@/entities/user";
import { Button } from "@/shared/ui";
import { Session } from "next-auth";
import { useState } from "react";
import { PiPencil } from "react-icons/pi";

import { ChangeUsernameForm } from "./ChangeUsernameForm";

type ChangeUsernameProps = {
    session: Session | null;
};

export const ChangeUsernameSetting = ({ session }: ChangeUsernameProps) => {
    const [isChangingUsername, setIsChangingUsername] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between gap-sm">
                <div className="flex items-center gap-md">
                    <UserAvatar avatarSrc={session?.user?.image} />
                    {isChangingUsername ? (
                        <ChangeUsernameForm
                            userId={session?.user?.id as string}
                            initialName={session?.user?.name as string}
                            afterSubmit={() => setIsChangingUsername(false)}
                        />
                    ) : (
                        <div className="text-lg md:text-xl">
                            {session?.user?.name}
                        </div>
                    )}
                </div>
                {!isChangingUsername && (
                    <Button
                        onClick={() => setIsChangingUsername(true)}
                        variant="ghost"
                        className="aspect-square p-sm"
                    >
                        <PiPencil size="1.125rem" />
                    </Button>
                )}
            </div>
        </div>
    );
};
