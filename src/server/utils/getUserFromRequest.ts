import { NextRequest } from "next/server";
import { verifyJwt } from "./jwt";

export function getUserFromRequest(req: NextRequest) {
    const auth = req.headers.get("authorization");
    if (!auth) return null;

    const token = auth.replace("Bearer ", "").trim();
    if (!token) return null;

    const decoded = verifyJwt(token);
    if (!decoded) return null;

    return decoded as { id: number; username: string };
}
