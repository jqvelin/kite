"use server";

import { type User } from "@/entities/user";
import { db } from "@/shared/api";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type AddUserToContactsResponse = {
    user?: User;
    error?: {
        message: string;
    };
};

export const addUserToContacts = async (
    contactsOfId: User["id"],
    userId: User["id"]
): Promise<AddUserToContactsResponse> => {
    try {
        const user = await db.user.update({
            where: {
                id: contactsOfId
            },
            data: {
                contacts: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        return { user };
    } catch (e) {
        if (e instanceof PrismaClientValidationError) {
            return {
                error: {
                    message: e.message
                }
            };
        }

        return {
            error: {
                message: `Unknown error while adding user ${userId} to contacts of ${contactsOfId}`
            }
        };
    }
};
