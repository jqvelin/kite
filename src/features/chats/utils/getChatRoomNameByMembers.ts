import { type User } from "@/entities/user";

import { type Chat } from "../model/Chat.type";

export const getChatRoomNameByMembers = (
    currentUserId: User["id"],
    members: Chat["members"]
) => {
    if (members.length == 2) {
        return members.find((member) => member.id !== currentUserId)!.name;
    } else {
        return members.reduce((acc, member, index) => {
            acc += member.name;

            if (index !== members.length - 1) {
                acc += ", ";
            }

            return acc;
        }, "");
    }
};
