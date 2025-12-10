import { NextResponse } from "next/server";
import { verifyJwt } from "@/server/utils/jwt";
import { withDb } from "@/server/utils/withDb";
import { UserService } from "@/server/services/userService";

export async function GET(req: Request) {
    try {
        const auth = req.headers.get("authorization");

        if (!auth || !auth.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid token" },
                { status: 401 }
            );
        }

        const token = auth.replace("Bearer ", "");

        const payload = verifyJwt(token);

        if (!payload) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        return withDb(async (db) => {
            const user = await UserService.getById(db, payload.userId);

            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                id: user.id,
                username: user.username,
                email: user.email,
            });
        });

    } catch (err) {
        console.error("API /auth/myuser error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
