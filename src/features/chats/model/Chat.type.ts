import { Prisma } from "@prisma/client";

export type Chat = Prisma.ChatGetPayload<{
    include: {
        members: true;
        messages: true;
        onlineMembers: true;
    };
}>;
