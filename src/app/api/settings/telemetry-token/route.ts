import { NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { SettingsService } from "@/server/services/SettingsService";

export async function POST(req: Request) {
    return withDb(async (db) => {
        const body = await req.json();

        // exemple : userId + settings envoyés depuis la page Settings
        const { userId, settings } = body;

        if (!userId || !settings) {
            return NextResponse.json(
                { error: "Requête invalide" },
                { status: 400 }
            );
        }

        try {
            const updated = await SettingsService.updateSettings(db, userId, settings);

            return NextResponse.json({
                success: true,
                settings: updated,
            });
        } catch (err: any) {
            return NextResponse.json(
                { error: err.message ?? "Erreur serveur" },
                { status: 500 }
            );
        }
    });
}
