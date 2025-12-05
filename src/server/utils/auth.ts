import { NextRequest } from "next/server";
import { ApiError } from "./api";
import { verifyJwt } from "./jwt";

export function getUserIdFromRequest(req: NextRequest) {
    const header = req.headers.get("authorization");

    if (!header || !header.startsWith("Bearer ")) {
        throw new ApiError("Missing Authorization header", 401);
    }

    const token = header.replace("Bearer ", "").trim();
    const payload = verifyJwt(token);

    if (!payload || !payload.userId) {
        throw new ApiError("Invalid or expired token", 401);
    }

    return { userId: payload.userId };
}
