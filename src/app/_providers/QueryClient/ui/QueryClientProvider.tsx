"use client";

import { noSSR } from "@/shared/utils";
import {
    QueryClientProvider as Provider,
    QueryClient
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export const QueryClientProvider = noSSR(
    ({ children }: { children: ReactNode }) => {
        const [queryClient] = useState(() => new QueryClient());
        return <Provider client={queryClient}>{children}</Provider>;
    }
);
