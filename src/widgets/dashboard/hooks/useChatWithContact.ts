import { useRootStore } from "@/app/_providers";
import type { User, UserSearchResult } from "@/entities/user";
import { type Chat } from "@/features/chats";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useChatWithContact = (contact: UserSearchResult) => {
    const { data: session } = useSession();
    const { openChat, chats } = useRootStore();

    const openChatWithContact = useCallback(async () => {
        const existingChat = chats.find((chat) => {
            return chat.members.some((member) => member.id === contact.id);
        });

        if (existingChat) {
            openChat(existingChat.id);
            return;
        }

        const chat: Chat = {
            id: crypto.randomUUID(),
            members: [session?.user, contact] as User[],
            messages: [],
            onlineMembers: [session?.user] as User[],
            type: "DIALOG",
            isStarted: false
        };

        openChat(chat);
    }, [contact, chats, openChat, session?.user]);

    return openChatWithContact;
};
