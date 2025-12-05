import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { getUserIdFromRequest } from "@/server/utils/auth";
import { ApiError } from "@/server/utils/api";
import { SettingsService } from "@/server/services/SettingsService";

// =======================
// GET SETTINGS
// =======================
export async function GET(req: NextRequest) {
    return withDb(async (db) => {
        const { userId } = getUserIdFromRequest(req);
        const settings = await SettingsService.getSettings(db, userId);
        return NextResponse.json(settings);
    });
}

// =======================
// UPDATE SETTINGS
// =======================
export async function PUT(req: NextRequest) {
    return withDb(async (db) => {
        try {
            const { userId } = getUserIdFromRequest(req);
            const body = await req.json();

            const updated = await SettingsService.updateSettings(db, userId, body);

            return NextResponse.json(updated);
        } catch (e: any) {
            throw new ApiError(e.message, 400);
        }
    });
}
