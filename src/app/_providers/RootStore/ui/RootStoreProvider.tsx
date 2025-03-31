"use client";

import { noSSR } from "@/shared/utils";
import { ReactNode, useEffect, useState } from "react";

import { RootStore } from "../model/RootStore";
import { RootStoreContext } from "../utils/useRootStore";

export const RootStoreProvider = noSSR(
    ({ children }: { children: ReactNode }) => {
        const [rootStore] = useState<RootStore | null>(() => new RootStore());

        useEffect(() => {
            rootStore?.connectToWebSocketServer();

            return () => {
                rootStore?.disconnectFromWebSocketServer();
            };
        }, [rootStore]);

        return (
            <RootStoreContext.Provider value={rootStore}>
                {children}
            </RootStoreContext.Provider>
        );
    }
);
