import { DataSource } from "typeorm";
import { User } from "@/server/DataBase/Entities/Users";
import crypto from "crypto";

export class TelemetryTokenService {

    static repo(db: DataSource) {
        return db.getRepository(User);
    }

    static async generateToken(db: DataSource, userId: number) {
        const user = await this.repo(db).findOne({ where: { id: userId } });

        if (!user) throw new Error("Utilisateur introuvable");

        const token = crypto.randomBytes(20).toString("hex");

        user.telemetry_token = token;

        await this.repo(db).save(user);

        return token;
    }

    static async validate(db: DataSource, userId: number, token: string) {
        const user = await this.repo(db).findOne({
            where: { id: userId, telemetry_token: token }
        });

        return user !== null;
    }
}
