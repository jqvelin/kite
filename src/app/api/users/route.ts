import { db } from "@/shared/api";
import { auth } from "@/shared/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await auth();
    if (!session) {
        return new NextResponse(null, { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");
    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    const users = await db.user.findMany({
        where: {
            name
        }
    });

    return NextResponse.json(users);
};
