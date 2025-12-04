import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { SettingsService } from "@/server/services/SettingsService";
import {getUserFromRequest} from "@/server/utils/getUserFromRequest";

export async function GET(req: NextRequest) {
    return withDb(async (db) => {
        const user = getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const settings = await SettingsService.getSettings(db,user.id);
        return NextResponse.json(settings);
    });
}

export async function PUT(req: NextRequest) {
    return withDb(async (db) => {
        const user = getUserFromRequest(req);
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const data = await req.json();
        const updated = await SettingsService.saveSettings(db, user.id, data);
        return NextResponse.json(updated);
    });
}
