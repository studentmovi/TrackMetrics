import { NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { SettingsService } from "@/server/services/SettingsService";

export async function POST(req: Request) {
    return withDb(async (db) => {
        const userId = 1; // TODO: remplacer par auth
        const token = await SettingsService.regenerateTelemetryToken(db, userId);

        return NextResponse.json({
            success: true,
            token,
        });
    });
}
