import { DataSource } from "typeorm";
import { UserSettings } from "@/server/DataBase/Entities";

export class UserSettingsRepository {
    static repo(db: DataSource) {
        return db.getRepository(UserSettings);
    }

    static async findByUserId(db: DataSource, userId: number) {
        return this.repo(db).findOne({ where: { user_id: userId } });
    }

    static async getOrCreateForUser(db: DataSource, userId: number) {
        let settings = await this.findByUserId(db, userId);
        if (!settings) {
            settings = this.repo(db).create({
                user_id: userId,
            });
            await this.repo(db).save(settings);
        }
        return settings;
    }

    static async updateForUser(
        db: DataSource,
        userId: number,
        data: Partial<UserSettings>
    ) {
        const settings = await this.getOrCreateForUser(db, userId);
        await this.repo(db).update(settings.id, data);
        return this.getOrCreateForUser(db, userId);
    }
}
