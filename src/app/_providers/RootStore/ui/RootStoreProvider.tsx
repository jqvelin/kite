"use client";

import { noSSR } from "@/shared/utils";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

import { RootStore } from "../model/RootStore";
import { RootStoreContext } from "../utils/useRootStore";

export const RootStoreProvider = noSSR(
    ({ children }: { children: ReactNode }) => {
        const { data: session } = useSession();
        const [rootStore] = useState<RootStore | null>(() => new RootStore());

        useEffect(() => {
            rootStore?.connectToWebSocketServer(session?.user?.id as string);

            return () => {
                rootStore?.disconnectFromWebSocketServer();
            };
        }, [rootStore, session?.user?.id]);

        return (
            <RootStoreContext.Provider value={rootStore}>
                {children}
            </RootStoreContext.Provider>
        );
    }
);
