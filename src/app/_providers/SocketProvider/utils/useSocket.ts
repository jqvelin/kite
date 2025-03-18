import { useContext } from "react";

import { SocketContext } from "../ui/SocketProvider";

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error(
            "Socket context was not found. Make sure the component is wrapped in <SocketProvider>"
        );
    }

    return context;
};
