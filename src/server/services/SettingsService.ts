import { DataSource } from "typeorm";
import { UserRepository } from "@/server/repositories/UserRepository";
import { UserSettingsRepository } from "@/server/repositories/UserSettingsRepository";
import { randomBytes } from "crypto";

export class SettingsService {

    static async getSettings(db: DataSource, userId: number) {
        const user = await UserRepository.findById(db, userId);
        if (!user) throw new Error("User not found");

        const settings = await UserSettingsRepository.getOrCreateForUser(db, userId);

        return {
            // profil
            username: user.username,
            email: user.email,
            avatarUrl: user.avatar_url,
            pilotNumber: user.pilot_number,
            telemetryToken: user.telemetry_token,
            simhubToken: user.simhub_token,

            // settings
            theme: settings.theme,
            showFlagsAlerts: settings.show_flags_alerts === "true",
            showFuelAlerts: settings.show_fuel_alerts === "true",
            showDamageAlerts: settings.show_damage_alerts === "true",
            units: settings.units,
            timeFormat: settings.time_format,
            language: settings.language,
            graphicsQuality: settings.graphics_quality,
        };
    }

    static async updateSettings(
        db: DataSource,
        userId: number,
        payload: any
    ) {
        const {
            username,
            email,
            avatarUrl,
            pilotNumber,
            simhubToken,

            theme,
            showFlagsAlerts,
            showFuelAlerts,
            showDamageAlerts,
            units,
            timeFormat,
            language,
            graphicsQuality,
        } = payload;

        // update user
        await UserRepository.updateProfile(db, userId, {
            username,
            email,
            avatar_url: avatarUrl,
            pilot_number: pilotNumber ?? null,
            simhub_token: simhubToken ?? null,
        });

        // update settings
        await UserSettingsRepository.updateForUser(db, userId, {
            theme,
            show_flags_alerts: showFlagsAlerts ? "true" : "false",
            show_fuel_alerts: showFuelAlerts ? "true" : "false",
            show_damage_alerts: showDamageAlerts ? "true" : "false",
            units,
            time_format: timeFormat,
            language,
            graphics_quality: graphicsQuality,
        });

        return this.getSettings(db, userId);
    }

    static async regenerateTelemetryToken(db: DataSource, userId: number) {
        const token = randomBytes(16).toString("hex");

        await UserRepository.updateProfile(db, userId, {
            telemetry_token: token,
        });

        return token;
    }
}
