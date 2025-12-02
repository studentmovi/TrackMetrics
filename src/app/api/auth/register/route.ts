import { NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { User } from "@/server/DataBase/Entities";
import { hashPassword } from "@/server/utils/hash";
import { PASSWORD_RULES, EMAIL_REGEX } from "../config";
import {sanitizeText} from "@/utils/sanitize";

export async function POST(req: Request) {
    try {
        const { email, username, password } = await req.json();

        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: "Email invalide" }, { status: 400 });
        }

        if (!password || password.length < PASSWORD_RULES.MIN_LENGTH) {
            return NextResponse.json(
                { error: `Mot de passe trop court (min ${PASSWORD_RULES.MIN_LENGTH})` },
                { status: 400 }
            );
        }

        const db = await withDb();
        const userRepo = db.getRepository(User);

        const existingUser = await userRepo.findOne({
            where: [{ email }, { username }],
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email ou username déjà utilisé" }, { status: 409 });
        }

        const newUser = userRepo.create({
            email: sanitizeText(email),
            username: sanitizeText(username),
            password_hash: await hashPassword(password),
        });

        await userRepo.save(newUser);

        return NextResponse.json({ success: true, userId: newUser.id });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
