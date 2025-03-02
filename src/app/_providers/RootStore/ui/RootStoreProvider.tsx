"use client";

import { noSSR } from "@/shared/utils";
import { ReactNode, useState } from "react";

import { RootStore } from "../model/RootStore";
import { RootStoreContext } from "../utils/useRootStore";

export const RootStoreProvider = noSSR(
    ({ children }: { children: ReactNode }) => {
        const [rootStore] = useState(() => new RootStore());

        return (
            <RootStoreContext.Provider value={rootStore}>
                {children}
            </RootStoreContext.Provider>
        );
    }
);
