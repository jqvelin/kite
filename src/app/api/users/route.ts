import { db } from "@/shared/api";
import { auth } from "@/shared/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await auth();
    if (!session) {
        return new NextResponse(null, { status: 403 });
    }

    const searchParams = Object.fromEntries<string | string[] | object>(
        req.nextUrl.searchParams
    );

    if (searchParams.contactOf && searchParams.contactOf !== session.user?.id) {
        return new NextResponse(null, { status: 403 });
    } else if (searchParams.contactOf) {
        searchParams.contactOf = {
            some: {
                id: searchParams.contactOf
            }
        };
    }

    const users = await db.user.findMany({
        where: {
            ...searchParams,
            name: {
                contains: searchParams.name as string,
                mode: "insensitive"
            }
        },
        select: {
            id: true,
            name: true,
            image: true
        }
    });

    return NextResponse.json(users);
};
