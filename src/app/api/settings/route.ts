import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { ApiError } from "@/server/utils/api";
import { getUserIdFromRequest } from "@/server/utils/auth";
import { User } from "@/server/DataBase/Entities";
import { comparePassword, hashPassword } from "@/server/utils/hash";

// =======================
//       GET SETTINGS
// =======================
export async function GET(req: NextRequest) {
    return withDb(async (db) => {
        const { userId } = getUserIdFromRequest(req);

        const repo = db.getRepository(User);
        const user = await repo.findOne({ where: { id: userId } });

        if (!user) throw new ApiError("User not found", 404);

        return NextResponse.json({
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            pilotNumber: user.pilotNumber,
            driverFlag: user.driverFlag,
            telemetryToken: user.telemetryToken,
            simhubToken: user.simhubToken,

            theme: user.theme,
            showFlagsAlerts: user.showFlagsAlerts,
            showFuelAlerts: user.showFuelAlerts,
            showDamageAlerts: user.showDamageAlerts,
            units: user.units,
            timeFormat: user.timeFormat,
            graphicsQuality: user.graphicsQuality,
        });
    });
}


// =======================
//       UPDATE SETTINGS
// =======================
export async function PUT(req: NextRequest) {
    return withDb(async (db) => {
        const { userId } = getUserIdFromRequest(req);
        const body = await req.json();

        const repo = db.getRepository(User);
        const user = await repo.findOne({ where: { id: userId } });

        if (!user) throw new ApiError("User not found", 404);

        // --- PROFILE ---
        if (body.username) user.username = body.username;
        if (body.email) user.email = body.email;
        if (body.avatarUrl) user.avatarUrl = body.avatarUrl;

        // --- DRIVER ---
        if (body.pilotNumber !== undefined) user.pilotNumber = body.pilotNumber;
        if (body.driverFlag) user.driverFlag = body.driverFlag;

        // --- DASHBOARD ---
        if (body.theme) user.theme = body.theme;
        if (body.units) user.units = body.units;
        if (body.timeFormat) user.timeFormat = body.timeFormat;

        if (body.showFlagsAlerts !== undefined) user.showFlagsAlerts = body.showFlagsAlerts;
        if (body.showFuelAlerts !== undefined) user.showFuelAlerts = body.showFuelAlerts;
        if (body.showDamageAlerts !== undefined) user.showDamageAlerts = body.showDamageAlerts;

        // --- PASSWORD UPDATE ---
        if (body.newPassword) {
            if (!body.currentPassword)
                throw new ApiError("Current password required", 400);

            const valid = await comparePassword(body.currentPassword, user.password_hash);
            if (!valid) throw new ApiError("Incorrect current password", 403);

            if (body.newPassword !== body.confirmPassword)
                throw new ApiError("Passwords do not match", 400);

            user.password_hash = await hashPassword(body.newPassword);
        }

        await repo.save(user);

        return NextResponse.json({ success: true });
    });
}
