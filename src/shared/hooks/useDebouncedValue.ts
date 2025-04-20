import { useEffect, useRef, useState } from "react";

export const useDebouncedValue = <T>(masterValue: T, delayMs = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState(masterValue);

    const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(
            () => setDebouncedValue(masterValue),
            delayMs
        );
    }, [masterValue, delayMs]);

    return debouncedValue;
};
