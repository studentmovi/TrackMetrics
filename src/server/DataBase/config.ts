import "dotenv/config";
export const DB_CONFIG = {
    type: "mariadb" as const,
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || "tm_user",
    password: process.env.DB_PASSWORD || "trackmetrics2025!",
    database: process.env.DB_NAME || "trackmetrics",
    connectorPackage:"mysql2",
};
