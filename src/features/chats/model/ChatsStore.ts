import type { Chat, Message } from "@/features/chats";
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
