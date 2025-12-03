import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { SessionJoinCode } from "@/server/DataBase/Entities/session_join_codes";
import { broadcastTelemetry } from "../../../ws/telemetry/[code]/route";

export async function POST(req: NextRequest, context: any) {
    const { code } = context.params;
    const body = await req.json();

    return withDb(async (db) => {
        const repo = db.getRepository(SessionJoinCode);

        const joinCode = await repo.findOne({
            where: { code, is_revoked: "false" },
        });

        if (!joinCode) {
            return NextResponse.json(
                { error: "Invalid or expired session code" },
                { status: 403 }
            );
        }

        // Forward telemetry to WebSocket clients
        broadcastTelemetry(code, body);

        return NextResponse.json({ ok: true });
    });
}
