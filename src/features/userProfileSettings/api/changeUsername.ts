"use server";

import { db } from "@/shared/api";
import { User } from "next-auth";

import { ChangeUsernameResponse } from "../model/changeUsernameResponse.type";
import { CHANGE_USERNAME_ERRORS } from "../utils/constants";

export const changeUsername = async (
    userId: User["id"],
    newUsername: User["name"]
): Promise<ChangeUsernameResponse> => {
    const conflictingUser = await db.user.findFirst({
        where: {
            name: newUsername
        }
    });

    if (conflictingUser) {
        return {
            error: {
                message: CHANGE_USERNAME_ERRORS.usernameIsTaken
            }
        };
    }

    const user = await db.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!user)
        return {
            error: {
                message: CHANGE_USERNAME_ERRORS.userNotFound
            }
        };

    if (!newUsername)
        return {
            error: {
                message: CHANGE_USERNAME_ERRORS.usernameIsEmpty
            }
        };

    if (newUsername.length > 20)
        return {
            error: {
                message: CHANGE_USERNAME_ERRORS.usernameIsTooLong
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
