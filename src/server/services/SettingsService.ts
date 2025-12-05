import { DataSource } from "typeorm";
import { User } from "@/server/DataBase/Entities/Users";
import { UserSettings } from "@/server/DataBase/Entities/User_settings";
import { hashPassword, comparePassword } from "@/server/utils/hash";
import { randomBytes } from "crypto";

export class SettingsService {

    // =========================================
    // GET SETTINGS FINALES
    // =========================================
    static async getSettings(db: DataSource, userId: number) {
        const userRepo = db.getRepository(User);
        const settingsRepo = db.getRepository(UserSettings);

        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        let settings = await settingsRepo.findOne({ where: { user_id: userId } });
        if (!settings) {
            // Auto-create settings
            settings = settingsRepo.create({ user_id: userId });
            await settingsRepo.save(settings);
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatar_url,
            pilotNumber: user.pilot_number,
            driverFlag: user.driverFlag,
            telemetryToken: user.telemetry_token,
            simhubToken: user.simhub_token,

            // SETTINGS TABLE
            theme: settings.theme,
            units: settings.units,
            timeFormat: settings.time_format,
            language: settings.language,
            graphicsQuality: settings.graphics_quality,

            showFlagsAlerts: settings.show_flags_alerts === "true",
            showFuelAlerts: settings.show_fuel_alerts === "true",
            showDamageAlerts: settings.show_damage_alerts === "true",
        };
    }

    // =========================================
    // UPDATE SETTINGS
    // =========================================
    static async updateSettings(db: DataSource, userId: number, body: any) {
        const userRepo = db.getRepository(User);
        const settingsRepo = db.getRepository(UserSettings);

        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        let settings = await settingsRepo.findOne({ where: { user_id: userId } });
        if (!settings) {
            settings = settingsRepo.create({ user_id: userId });
        }

        // ---------- UPDATE USER ----------
        if (body.username) user.username = body.username;
        if (body.email) user.email = body.email;
        if (body.avatarUrl !== undefined) user.avatar_url = body.avatarUrl;
        if (body.pilotNumber !== undefined) user.pilot_number = body.pilotNumber;
        if (body.driverFlag !== undefined) user.driverFlag = body.driverFlag;

        // ---------- PASSWORD UPDATE ----------
        if (body.newPassword) {
            if (!body.currentPassword)
                throw new Error("Current password is required");

            const valid = await comparePassword(body.currentPassword, user.password_hash);
            if (!valid) throw new Error("Incorrect current password");

            if (body.newPassword !== body.confirmPassword)
                throw new Error("Passwords do not match");

            user.password_hash = await hashPassword(body.newPassword);
        }

        await userRepo.save(user);

        // ---------- UPDATE SETTINGS ----------
        if (body.theme !== undefined) settings.theme = body.theme;
        if (body.units !== undefined) settings.units = body.units;
        if (body.timeFormat !== undefined) settings.time_format = body.timeFormat;
        if (body.language !== undefined) settings.language = body.language;
        if (body.graphicsQuality !== undefined) settings.graphics_quality = body.graphicsQuality;

        if (body.showFlagsAlerts !== undefined)
            settings.show_flags_alerts = body.showFlagsAlerts ? "true" : "false";

        if (body.showFuelAlerts !== undefined)
            settings.show_fuel_alerts = body.showFuelAlerts ? "true" : "false";

        if (body.showDamageAlerts !== undefined)
            settings.show_damage_alerts = body.showDamageAlerts ? "true" : "false";

        await settingsRepo.save(settings);

        return this.getSettings(db, userId);
    }

    // =========================================
    // REGENERATE TELEMETRY TOKEN
    // =========================================
    static async regenerateTelemetryToken(db: DataSource, userId: number) {
        const token = randomBytes(16).toString("hex");

        await db.getRepository(User).update(userId, {
            telemetry_token: token,
        });

        return token;
    }
}
