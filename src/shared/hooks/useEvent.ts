import { useCallback, useEffect } from "react";

export function useEvent<EventType extends Event>(
    eventType: string,
    listener: (e: EventType) => void,
    eventFilter?: Partial<EventType>
) {
    const preciseListener = useCallback(
        (e: EventType) => {
            let doesMatchFilter = true;

            for (const key in eventFilter) {
                if (e[key] !== eventFilter[key]) {
                    doesMatchFilter = false;
                    break;
                }
            }

            if (doesMatchFilter) {
                listener(e);
            }
        },
        [eventFilter, listener]
    );

    useEffect(() => {
        const eventController = new AbortController();

        if (!eventFilter) {
            document.addEventListener(eventType, listener, eventController);
        }

        document.addEventListener(eventType, preciseListener, eventController);

        return () => {
            eventController.abort();
        };
    }, [eventType, listener, eventFilter, preciseListener]);
}
