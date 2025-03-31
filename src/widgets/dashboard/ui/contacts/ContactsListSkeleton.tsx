import { memo } from "react";

const ContactsListSkeletonUnoptimized = () => (
    <div className="flex flex-col w-full animate-pulse">
        <div className="h-16 flex items-center gap-md px-sm w-full">
            <div className="w-[50px] aspect-square rounded-full bg-primary"></div>
            <div className="flex flex-col gap-sm">
                <div className="h-4 w-32 bg-primary"></div>
                <div className="h-4 w-16 bg-primary"></div>
            </div>
        </div>
        <div className="h-16 flex items-center gap-md px-sm w-full">
            <div className="w-[50px] aspect-square rounded-full bg-primary"></div>
            <div className="flex flex-col gap-sm">
                <div className="h-4 w-32 bg-primary"></div>
                <div className="h-4 w-16 bg-primary"></div>
            </div>
        </div>
        <div className="h-16 flex items-center gap-md px-sm w-full">
            <div className="w-[50px] aspect-square rounded-full bg-primary"></div>
            <div className="flex flex-col gap-sm">
                <div className="h-4 w-32 bg-primary"></div>
                <div className="h-4 w-16 bg-primary"></div>
            </div>
        </div>
    </div>
);

export const ContactsListSkeleton = memo(ContactsListSkeletonUnoptimized);
