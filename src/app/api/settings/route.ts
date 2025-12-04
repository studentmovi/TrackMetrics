import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { ApiError } from "@/server/utils/api";
import { verifyAuth } from "@/server/utils/verifyAuth";
import { User } from "@/server/DataBase/Entities";

export async function GET(req: NextRequest) {
    return withDb(async (db) => {
        const { userId } = await verifyAuth(req);

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

export async function PUT(req: NextRequest) {
    return withDb(async (db) => {
        const { userId } = await verifyAuth(req);
        const body = await req.json();

        const repo = db.getRepository(User);
        const user = await repo.findOne({ where: { id: userId } });

        if (!user) throw new ApiError("User not found", 404);

        if (body.username) user.username = body.username;
        if (body.email) user.email = body.email;
        if (body.avatarUrl) user.avatarUrl = body.avatarUrl;
        if (body.pilotNumber !== undefined) user.pilotNumber = body.pilotNumber;
        if (body.driverFlag) user.driverFlag = body.driverFlag;

        if (body.theme) user.theme = body.theme;
        if (body.units) user.units = body.units;
        if (body.timeFormat) user.timeFormat = body.timeFormat;

        if (body.showFlagsAlerts !== undefined) user.showFlagsAlerts = body.showFlagsAlerts;
        if (body.showFuelAlerts !== undefined) user.showFuelAlerts = body.showFuelAlerts;
        if (body.showDamageAlerts !== undefined) user.showDamageAlerts = body.showDamageAlerts;

        await repo.save(user);

        return NextResponse.json(user);
    });
}
