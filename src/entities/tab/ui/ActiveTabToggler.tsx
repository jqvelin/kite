"use client";

import { Button } from "@/shared/ui";
import { useMemo } from "react";

import { TABS } from "../config/tabs";
import { Tab } from "../model/tab.type";

type ActiveTabTogglerProps = {
    activeTab: Tab;
    setActiveTab: (nextActiveTab: Tab) => void;
};

export const ActiveTabToggler = ({
    activeTab,
    setActiveTab
}: ActiveTabTogglerProps) => {
    const tabs = useMemo(() => Object.entries(TABS) as [Tab, string][], []);

    const activeTabUnderlineOffset = useMemo(() => {
        const activeTabInList = tabs.find((tab) => tab[0] === activeTab);

        if (activeTabInList) {
            return 100 * tabs.indexOf(activeTabInList);
        }

        return 0;
    }, [tabs]);

    return (
        <div className="w-full flex relative h-12 border-b-1">
            {tabs.map(([tab, label]) => (
                <Button
                    onClick={() => setActiveTab(tab)}
                    variant="ghost"
                    key={tab}
                    className="text-primary flex-1 hover:bg-transparent"
                >
                    {label}
                </Button>
            ))}
            <div
                style={{
                    width: tabs.length > 0 ? `${100 / tabs.length}%` : 0,
                    transform: `translateX(${activeTabUnderlineOffset}%)`
                }}
                className="h-0.5 absolute bottom-0 translate-y-1/2 bg-accent transition-transform"
            ></div>
        </div>
    );
};
