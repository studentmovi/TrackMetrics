import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";

// ----- Générer un token (2h)
export function signJwt(payload: any) {
    return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

// ----- Vérifier le token
export function verifyJwt(token: string) {
    try {
        return jwt.verify(token, SECRET);
    } catch {
        return null;
    }
}
