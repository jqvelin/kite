"use client";

import { ComponentPropsWithRef } from "react";

type ChatWindowMessagesProps = ComponentPropsWithRef<"div">;

export const ChatWindowMessages = (props: ChatWindowMessagesProps) => {
    return <div {...props}></div>;
};
