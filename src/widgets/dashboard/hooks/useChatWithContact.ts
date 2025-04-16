import { useRootStore } from "@/app/_providers";
import type { User, UserSearchResult } from "@/entities/user";
import { type Chat } from "@/features/chats";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useChatWithContact = (contact: UserSearchResult) => {
    const { data: session } = useSession();
    const { openChat, chatsStore } = useRootStore();
    const queryClient = useQueryClient();

    const openChatWithContact = useCallback(async () => {
        const existingChat = chatsStore.chats?.find((chat) => {
            return chat.members.some((member) => {
                return member.id === contact.id;
            });
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

        // const chat = await createChat({
        //     memberIds: [session?.user?.id as string, contactId]
        // });

        // await queryClient.invalidateQueries({ queryKey: ["chats"] });
    }, [chatsStore.chats, openChat, queryClient, session?.user?.id]);

    return openChatWithContact;
};
