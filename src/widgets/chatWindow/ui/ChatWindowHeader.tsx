"use client";

import { useRootStore } from "@/app/_providers";
import { ChatImage, getChatRoomNameByMembers } from "@/features/chats";
import { Button } from "@/shared/ui";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Transition, type TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";

const CHATTER_STATUS_TRANSITION_STATE_CLASSNAMES: {
    [key in TransitionStatus]: string;
} = {
    entering: "translate-y-[calc(100%+1rem)] opacity-0",
    entered: "translate-y-full opacity-100",
    exiting: "translate-y-full opacity-0",
    exited: "translate-y-full opacity-0",
    unmounted: ""
};

export const ChatWindowHeader = () => {
    const { data: session } = useSession();

    const { currentChat, setCurrentChatId } = useRootStore();

    const chatRoomName = getChatRoomNameByMembers(
        session?.user?.id as string,
        currentChat!.members
    );

    const isChatWithLlama = !!currentChat?.members.find(
        (member) => member.id === process.env.NEXT_PUBLIC_LLAMA_USER_ID
    );

    const isChatterOnline =
        isChatWithLlama ||
        (currentChat?.type === "DIALOG" &&
            !!currentChat.onlineMembers.find(
                (member) => member.id !== session?.user?.id
            ));

    const userStatusRef = useRef<HTMLDivElement>(null);

    const goBack = () => {
        setCurrentChatId(null);
    };

    return (
        <div className="flex items-center gap-md">
            <Button
                onClick={goBack}
                variant="ghost"
                className="p-md rounded-full"
            >
                <BiArrowBack size="1.125rem" />
            </Button>
            <ChatImage chat={currentChat!} />
            <div className="relative">
                <div className="text-xl font-semibold">{chatRoomName}</div>
                <Transition
                    nodeRef={userStatusRef}
                    in={isChatterOnline}
                    timeout={400}
                    mountOnEnter
                    unmountOnExit
                >
                    {(state) => (
                        <div
                            ref={userStatusRef}
                            className={twMerge(
                                "absolute transition-all font-semibold bottom-0 whitespace-nowrap text-accent",
                                CHATTER_STATUS_TRANSITION_STATE_CLASSNAMES[
                                    state
                                ]
                            )}
                        >
                            В сети
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    );
};
