"use server";

import { db } from "@/shared/api";
import { User } from "next-auth";

import { ChangeUsernameResponse } from "../model/changeUsernameResponse.type";

export const changeUsername = async (
    userId: User["id"],
    newUsername: User["name"]
): Promise<ChangeUsernameResponse> => {
    const user = await db.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!user)
        return {
            error: {
                message: "User not found"
            }
        };

    if (!newUsername)
        return {
            error: {
                message: "Username is empty"
            }
        };

    if (newUsername.length > 20)
        return {
            error: {
                message: "No longer than 20 characters"
            }
        };

    const updatedUser = await db.user.update({
        where: {
            id: userId
        },
        data: {
            name: newUsername
        }
    });

    return { user: updatedUser };
};
