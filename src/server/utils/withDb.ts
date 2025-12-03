import { initDb } from "@/server/DataBase/initDb";
import type { DataSource } from "typeorm";

export async function withDb<T>(handler: (db: DataSource) => Promise<T>): Promise<T> {
    const db = await initDb();
    return handler(db);
}
