import { TelemetryTokenService } from "@/server/services/TelemetryTokenService";
import { withDb } from "@/server/utils/withDb";
import { NextResponse } from "next/server";
import { TelemetryService } from "@/server/services/TelemetryService";
import { getAdapter } from "@/server/telemetry/adapters";

export async function POST(req, { params }) {
    const { userId, token } = params;
    const body = await req.json();

    return withDb(async (db) => {
        const tokenValid = await TelemetryTokenService.validate(db, Number(userId), token);
        if (!tokenValid) {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }

        const game = body.game || "unknown";
        const adapter = getAdapter(game);

        const normalized = adapter ? adapter(body) : body;

        await TelemetryService.store(db, Number(userId), normalized);

        return NextResponse.json({ ok: true });
    });
}
