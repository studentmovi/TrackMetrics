import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_CONFIG } from "./config";
import { entities } from "./Entities";

export const AppDataSource = new DataSource({
    ...DB_CONFIG,
    logging: false,
    synchronize: false, // On synchronise manuellement via initDb()
    entities,
});
