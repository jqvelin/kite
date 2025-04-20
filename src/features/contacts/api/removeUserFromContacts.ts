"use server";

import { type User } from "@/entities/user";
import { db } from "@/shared/api";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type RemoveUserFromContactsResponse = {
    data?: User;
    error?: {
        message: string;
    };
};

export const removeUserFromContacts = async (
    contactsOfId: User["id"],
    userId: User["id"]
): Promise<RemoveUserFromContactsResponse> => {
    try {
        const data = await db.user.update({
            where: {
                id: contactsOfId
            },
            data: {
                contacts: {
                    delete: {
                        ownerId_contactId: {
                            ownerId: contactsOfId,
                            contactId: userId
                        }
                    }
                }
            }
        });

        return { data };
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
                message: `Unknown error while removing user ${userId} from the contacts of ${contactsOfId}`
            }
        };
    }
};
