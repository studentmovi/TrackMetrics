import { NextRequest, NextResponse } from "next/server";
import { withDb } from "@/server/utils/withDb";
import { UserService } from "@/server/services/userService";
import { sanitizeText } from "@/utils/sanitize";
import { ApiError, handleApiError } from "@/server/utils/api";
import { signJwt } from "@/server/utils/jwt";
import { z } from "zod";

const loginSchema = z.object({
    login: z.string().min(4),
    password: z.string().min(6),
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

            const token = signJwt({
                id: user.id,
                username: user.username,
            });

            return NextResponse.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        });

    } catch (err) {
        return handleApiError(err, "Erreur lors de la tentative de connexion");
    }
}
