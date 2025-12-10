import { DataSource } from "typeorm";
import { User } from "@/server/DataBase/Entities";
import { hashPassword, comparePassword } from "@/server/utils/hash";
import { ApiError } from "@/server/utils/api";

export class UserService {

    static repo(db: DataSource) {
        return db.getRepository(User);
    }

    static async validateLogin(db: DataSource, login: string, password: string) {
        const repo = this.repo(db);

        // email OU username
        const user = await repo.findOne({
            where: [
                { email: login },
                { username: login }
            ]
        });

        if (!user) {
            throw new ApiError(401, "Utilisateur non trouvé");
        }

        const valid = await comparePassword(password, user.password_hash);
        if (!valid) {
            throw new ApiError(401, "Mot de passe incorrect");
        }

        return user;
    }
    static async getById(db: DataSource, id: number) {
        const repo = this.repo(db);
        const user = await repo.findOne({ where: { id } });

        if (!user) {
            throw new ApiError("User not found", 404);
        }

        return user;
    }
    static async createUser(db: DataSource, email: string, username: string, password: string) {
        const repo = this.repo(db);

        const existingUser = await repo.findOne({
            where: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            throw new ApiError("Email ou nom d'utilisateur déjà utilisé", 400);
        }

        const password_hash = await hashPassword(password);

        const newUser = repo.create({
            email,
            username,
            password_hash,
        });

        await repo.save(newUser);
        return newUser;
    }
}
