"use client";

import { Button } from "@/shared/ui";
import { signOut } from "next-auth/react";

export const Homepage = () => {
    return <Button onClick={() => signOut()}>sign out</Button>;
};
