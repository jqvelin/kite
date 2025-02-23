import { KiteIcon } from "@/shared/ui";
import { SlSettings } from "react-icons/sl";

export const SidebarHeader = () => (
    <div className="flex items-center justify-between w-full px-sm py-md border-b-1">
        <div className="flex items-center gap-sm">
            <KiteIcon size="2rem" />
            <span className="text-accent font-bold text-xl">Kite</span>
        </div>
        <button>
            <SlSettings size="1.5rem" />
        </button>
    </div>
);
