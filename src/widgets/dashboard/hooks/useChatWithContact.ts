import { useRootStore } from "@/app/_providers";
import { UserSearchResult } from "@/entities/user";
import { createChat, useGetChatsQuery } from "@/features/chats";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useChatWithContact = (contactId: UserSearchResult["id"]) => {
    const { data: session } = useSession();
    const { joinChatRoom } = useRootStore();
    const { data: chats } = useGetChatsQuery(session?.user?.id as string);
    const queryClient = useQueryClient();

    const openChatWithContact = useCallback(async () => {
        const existingChat = chats?.find((chat) => {
            return chat.members.some((member) => {
                return member.id === contactId;
            });
        });

        if (existingChat) {
            joinChatRoom(existingChat);
            return;
        }

        await createChat({
            memberIds: [session?.user?.id as string, contactId]
        });

        await queryClient.invalidateQueries({ queryKey: ["chats"] });
    }, [chats, contactId, joinChatRoom, queryClient, session?.user?.id]);

    return openChatWithContact;
};
