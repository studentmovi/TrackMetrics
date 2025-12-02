import { withDb } from "@/server/utils/withDb";
import { TelemetryTokenService } from "@/server/services/TelemetryTokenService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    return withDb(async (db) => {
        const { userId } = await req.json();

        const token = await TelemetryTokenService.generateToken(db, userId);

        return NextResponse.json({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/telemetry/${userId}/${token}`
        });
    });
}
