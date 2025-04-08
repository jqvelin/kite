"use client";

import { useRootStore } from "@/app/_providers";
import { ActiveTabToggler } from "@/entities/tab";
import { observer } from "mobx-react-lite";

import { getActiveTabComponent } from "../utils/getActiveTabComponent";

export const DashboardContents = observer(() => {
    const {
        dashboardStore: { activeTab, setActiveTab }
    } = useRootStore();

    const ActiveTab = getActiveTabComponent(activeTab);

    return (
        <div className="flex-1 flex flex-col">
            <ActiveTabToggler
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <ActiveTab />
        </div>
    );
});
