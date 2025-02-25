import { SidebarContents } from "./SidebarContents";
import { SidebarHeader } from "./SidebarHeader";

export const Sidebar = () => {
    return (
        <aside className="w-full md:w-86 h-full flex flex-col bg-background rounded-lg shadow-lg">
            <SidebarHeader />
            <SidebarContents />
        </aside>
    );
};
