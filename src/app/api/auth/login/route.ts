import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { UserService } from "@/server/services/userService";
import { sanitizeText } from "@/utils/sanitize";
import { ApiError, handleApiError } from "@/server/utils/api";
import { z } from "zod";

const loginSchema = z.object({
    login: z.string().min(4, "Champ invalide"),  // email ou username
    password: z.string().min(6, "Mot de passe trop court"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = loginSchema.safeParse(body);
        if (!result.success) {
            throw new ApiError(result.error.issues[0].message, 400);
        }

        const { login, password } = result.data;

        return withDb(async (db) => {
            const cleanLogin = sanitizeText(login);
            const cleanPassword = sanitizeText(password);

            const user = await UserService.validateLogin(db, cleanLogin, cleanPassword);

            if (!user) {
                throw new ApiError("Identifiants invalides", 401);
            }

            return NextResponse.json({
                success: true,
                user,
            });
        });

    } catch (err) {
        return handleApiError(err, "Erreur lors de la tentative de connexion");
    }
}
