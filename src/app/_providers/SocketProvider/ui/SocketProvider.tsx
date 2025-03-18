"use client";

import { ClientToServerEvent, ServerToClientEvent } from "@/features/chats";
import { noSSR } from "@/shared/utils";
import { ReactNode, createContext, useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";

export const SocketContext = createContext<Socket<
    ServerToClientEvent,
    ClientToServerEvent
> | null>(null);

export const SocketProvider = noSSR(({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket<
        ServerToClientEvent,
        ClientToServerEvent
    > | null>(null);

    useEffect(() => {
        const socket = io();

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
});
