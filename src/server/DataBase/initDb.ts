import { AppDataSource } from "./index";

let initialized = false;
let promise: Promise<void> | null = null;

export const initDb = async () => {
    if (initialized && AppDataSource.isInitialized) return AppDataSource;

    if (!promise) {
        promise = AppDataSource.initialize()
            .then(async () => {
                console.log("[DB] Connected");
                await AppDataSource.synchronize();
                console.log("[DB] Synchronized");
                initialized = true;
            })
            .catch((err) => {
                console.error("[DB] ERROR:", err);
                promise = null;
                throw err;
            });
    }

    await promise;
    return AppDataSource;
};
