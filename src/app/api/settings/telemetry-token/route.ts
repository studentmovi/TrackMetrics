import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { SettingsService } from "@/server/services/SettingsService";
import { getUserIdFromRequest } from "@/server/utils/auth";

export async function POST(req: NextRequest) {
    return withDb(async (db) => {
        const { userId } = getUserIdFromRequest(req);
        const token = await SettingsService.regenerateTelemetryToken(db, userId);
        return NextResponse.json({ token });
    });
}
