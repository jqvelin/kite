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

    if (!searchParams.memberId) {
        return new NextResponse(null, { status: 400 });
    }

    if (searchParams.memberId !== session.user?.id) {
        return new NextResponse(null, { status: 403 });
    }

    searchParams.members = {
        some: {
            id: searchParams.memberId
        }
    };

    delete searchParams.memberId;

    const chats = await db.chat.findMany({
        where: {
            ...searchParams
        }
    });

    return NextResponse.json(chats);
};
