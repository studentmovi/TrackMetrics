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
    return withDb(async (db) => {
        try {
            const body = await req.json();
            const { login, password } = loginSchema.parse(body);

            const user = await UserService.validateLogin(db, login, password);

            return NextResponse.json({
                id: user.id,
                email: user.email,
                username: sanitizeText(user.username),
            });
        } catch (err: any) {
            return handleApiError(err);
        }
    });
}

