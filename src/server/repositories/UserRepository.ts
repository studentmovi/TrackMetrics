import { DataSource } from "typeorm";
import { User } from "@/server/DataBase/Entities";

export class UserRepository {
    static repo(db: DataSource) {
        return db.getRepository(User);
    }

    static async findById(db: DataSource, id: number) {
        return this.repo(db).findOne({ where: { id } });
    }

    static async findByTelemetryToken(db: DataSource, token: string) {
        return this.repo(db).findOne({ where: { telemetry_token: token } });
    }

    static async updateProfile(
        db: DataSource,
        id: number,
        data: Partial<User>
    ) {
        await this.repo(db).update(id, data);
        return this.findById(db, id);
    }
}
