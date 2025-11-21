import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/server/services/userService";
import { sanitizeText } from "@/utils/sanitize";
import { withDb } from "@/server/utils/withDb";
import { logger } from "@/server/utils/logger";
import { ApiError, handleApiError, jsonResponse } from "@/server/utils/api";
import { z } from "zod";

const createUserSchema = z.object({
    login: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    password: z.string().min(4, "Le mot de passe doit contenir au moins 4 caractères"),
    githubToken: z.string().min(1, "Le token GitHub est requis"),
});

export async function GET() {
    return withDb(async () => {
        try {
            const users = await UserService.getAllUsers();

            return NextResponse.json(
                users.map((u) => ({
                    id: u.id,
                    login: sanitizeText(u.login),
                }))
            );
        } catch (err: any) {
            logger.error(`Erreur GET /users : ${err.message}`);
            throw ApiError.serverError("Impossible de récupérer la liste des utilisateurs");
        }
    });
}

export async function POST(req: NextRequest) {
    return withDb(async () => {
        try {
            const body = await req.json();

            const parsed = createUserSchema.safeParse(body);
            if (!parsed.success) {
                const message = parsed.error.issues.map((e) => e.message).join(", ");
                logger.warn(`Échec validation POST /users : ${message}`);
                return jsonResponse({ success: false, error: message },400);
            }

            const { login, password, githubToken } = parsed.data;
            const cleanLogin = sanitizeText(login);
            const cleanGithubToken = sanitizeText(githubToken);

            const user = await UserService.addUser(cleanLogin, password, cleanGithubToken);

            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    login: sanitizeText(user.login),
                },
            });
        } catch (err: any) {
            logger.error(`Erreur POST /users : ${err.message}`);
            return handleApiError(err, "Erreur lors de la création de l'utilisateur", 500);
        }
    });
}