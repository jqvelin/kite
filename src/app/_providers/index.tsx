import { auth } from "@/shared/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { QueryClientProvider } from "./QueryClient/ui/QueryClientProvider";
import { RootStoreProvider } from "./RootStore/ui/RootStoreProvider";

export const WithProviders = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    return (
        <SessionProvider
            session={session}
            refetchOnWindowFocus={false}
        >
            <QueryClientProvider>
                <RootStoreProvider>{children}</RootStoreProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export { useRootStore } from "./RootStore/utils/useRootStore";
