import { NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { SettingsService } from "@/server/services/SettingsService";

export async function GET(req: Request) {
    return withDb();
}

export async function PUT(req: Request) {
    return withDb();
}
