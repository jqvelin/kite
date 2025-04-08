import { useRootStore } from "@/app/_providers";
import { UserSearchResult } from "@/entities/user";
import { createChat } from "@/features/chats";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useChatWithContact = (contactId: UserSearchResult["id"]) => {
    const { data: session } = useSession();
    const { openChat, chatsStore } = useRootStore();
    const queryClient = useQueryClient();

    const openChatWithContact = useCallback(async () => {
        const existingChat = chatsStore.chats?.find((chat) => {
            return chat.members.some((member) => {
                return member.id === contactId;
            });
        });

        if (existingChat) {
            openChat(existingChat.id);
            return;
        }

        await createChat({
            memberIds: [session?.user?.id as string, contactId]
        });

        await queryClient.invalidateQueries({ queryKey: ["chats"] });
    }, [chatsStore.chats, contactId, openChat, queryClient, session?.user?.id]);

    return openChatWithContact;
};
