"use client";

import { queryClient } from "@/shared/api";
import { noSSR } from "@/shared/utils";
import { QueryClientProvider as Provider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const QueryClientProvider = noSSR(
    ({ children }: { children: ReactNode }) => {
        return <Provider client={queryClient}>{children}</Provider>;
    }
);
