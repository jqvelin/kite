import { type User } from "@/entities/user";
import type { Chat, Message, UserChatStatus } from "@/features/chats";
import {
    type DefaultError,
    type QueryClient,
    type QueryKey,
    QueryObserver,
    type QueryObserverOptions
} from "@tanstack/react-query";
import { createAtom } from "mobx";

export class ChatsStore<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
> {
    private atom = createAtom(
        "Chats",
        () => this.subscribeToQueryObserver(),
        () => this.unsubscribeFromQueryObserver()
    );

    private queryObserver = new QueryObserver(
        this.queryClient,
        this.defaultOptions
    );

    constructor(
        private getOptions: () => QueryObserverOptions<
            TQueryFnData,
            TError,
            TData,
            TQueryData,
            TQueryKey
        >,
        private queryClient: QueryClient
    ) {}

    get chats() {
        this.atom.reportObserved();

        const data = this.queryObserver.getOptimisticResult(
            this.defaultOptions
        ).data;

        console.log(data);

        if (!data) {
            throw this.queryObserver.fetchOptimistic(this.defaultOptions);
        }

        return data;
    }

    // Добавляем сообщение в кэш React Query.
    // Можно использовать как для полученных сообщений,
    // так и для отображения в интерфейсе отправленных.
    receiveMessage(message: Message) {
        this.queryClient.setQueryData<Chat[]>(
            this.defaultOptions.queryKey,
            (prevChatsData) => {
                const newChatsData = prevChatsData?.map((chat) => {
                    if (chat.id === message.chatId) {
                        return {
                            ...chat,
                            messages: [...chat.messages, message]
                        };
                    }

                    return chat;
                });

                return newChatsData;
            }
        );
    }

    changeChatterStatus(
        chatterId: User["id"],
        chatId: Chat["id"],
        newStatus: UserChatStatus
    ) {
        this.queryClient.setQueryData<Chat[]>(
            this.defaultOptions.queryKey,
            (prevChatsData) => {
                const newChatsData = prevChatsData?.map((chat) => {
                    if (chat.id !== chatId) return chat;

                    if (newStatus === "online") {
                        const member = chat.members.find(
                            (member) => member.id === chatterId
                        );

                        if (!member) {
                            throw new Error(
                                `No chatters with id ${chatterId} have been found`
                            );
                        }

                        return {
                            ...chat,
                            onlineMembers: [...chat.onlineMembers, member]
                        };
                    }

                    return {
                        ...chat,
                        onlineMembers: chat.onlineMembers.filter(
                            (member) => member.id !== chatterId
                        )
                    };
                });

                return newChatsData;
            }
        );
    }

    private subscribeToQueryObserver() {
        this.unsubscribeFromQueryObserver = this.queryObserver.subscribe(() => {
            this.atom.reportChanged();
        });
    }

    private unsubscribeFromQueryObserver() {}

    private get defaultOptions() {
        return this.queryClient.defaultQueryOptions(this.getOptions());
    }
}
