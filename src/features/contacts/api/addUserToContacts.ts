"use server";

import { type User } from "@/entities/user";
import { db } from "@/shared/api";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type AddUserToContactsResponse = {
    data?: {
        ownerId: User["id"];
        contactId: User["id"];
    };
    error?: {
        message: string;
    };
};

export const addUserToContacts = async (
    contactsOfId: User["id"],
    userId: User["id"]
): Promise<AddUserToContactsResponse> => {
    try {
        const data = await db.contact.create({
            data: {
                ownerId: contactsOfId,
                contactId: userId
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
                message: `Unknown error while adding user ${userId} to contacts of ${contactsOfId}`
            }
        };
    }
};
