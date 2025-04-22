import { useSyncExternalStore } from "react";

const media = window.matchMedia("(max-width: 767px)");

const subscribe = (cb: () => void) => {
    media.addEventListener("change", cb);

    return () => {
        media.removeEventListener("change", cb);
    };
};

const getSnapshot = () => media.matches;

export const useIsViewportNarrow = () => {
    return useSyncExternalStore(subscribe, getSnapshot);
};
