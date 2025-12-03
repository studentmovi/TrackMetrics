import { withDb } from "@/server/utils/withDb";
import { TelemetryTokenService } from "@/server/services/TelemetryTokenService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    return withDb(async (db) => {
        const body = await req.json();
        const { session_id } = body;

        if (!session_id) {
            return NextResponse.json(
                { error: "session_id manquant" },
                { status: 400 }
            );
        }

        // Génération du token via un service propre
        const token = await TelemetryTokenService.generateToken(db, session_id);

        return NextResponse.json({ token });
    });
}
