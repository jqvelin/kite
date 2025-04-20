import { useRootStore } from "@/app/_providers";
import { useEffect, useRef } from "react";

export const useScrollOnMessageReception = () => {
    const { currentChat } = useRootStore();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollBy(0, ref.current.scrollHeight);
    }, [currentChat?.messages.length]);

    return ref;
};
