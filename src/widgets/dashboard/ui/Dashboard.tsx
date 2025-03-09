import { DashboardContents } from "./DashboardContents";
import { DashboardHeader } from "./DashboardHeader";

export const Dashboard = () => {
    return (
        <aside className="w-full md:w-86 h-full flex flex-col bg-background rounded-lg shadow-lg">
            <DashboardHeader />
            <DashboardContents />
        </aside>
    );
};
