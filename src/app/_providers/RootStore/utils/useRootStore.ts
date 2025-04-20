"use client";

import { createContext, useContext } from "react";

import { RootStore } from "../model/RootStore";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
    const context = useContext(RootStoreContext);

    if (!context)
        throw new Error(
            "RootStoreContext was not found. Make sure to wrap application in <RootStoreProvider>"
        );

    return context;
};
