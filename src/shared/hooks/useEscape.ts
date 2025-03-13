import { useEffect } from "react";

export const useEscape = (callback: (...args: unknown[]) => void) => {
    useEffect(() => {
        const controller = new AbortController();

        document.addEventListener(
            "keydown",
            (e) => {
                if (e.key === "Escape") {
                    callback();
                }
            },
            controller
        );

        return () => controller.abort();
    }, []);
};
