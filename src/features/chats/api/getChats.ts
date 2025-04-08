import { type Chat } from "@/features/chats";
import { api } from "@/shared/api";
import { getSession } from "next-auth/react";

export const getChats = async () => {
    const session = await getSession();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    return api
        .get<Chat[]>("chats", { searchParams: { memberId: session.user.id } })
        .json();
};
