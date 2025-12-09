import "reflect-metadata";
import "dotenv/config";
import fs from "fs";
import path from "path";

import { initDb } from "@/server/DataBase/initDb";
import { User, Track, Car } from "@/server/DataBase/Entities";
import { hashPassword } from "@/server/utils/hash";

async function seed() {
    const db = await initDb();

    console.log("📄 Lecture du fichier config.json...");
    const configPath = path.join(process.cwd(), "config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

    const userRepo = db.getRepository(User);
    const trackRepo = db.getRepository(Track);
    const carRepo = db.getRepository(Car);

    /* -----------------------------------------------------------------------
       👤 ADMIN — CREATE OR UPDATE
    ----------------------------------------------------------------------- */

    const adminData = config.admin;

    let admin = await userRepo.findOne({ where: { email: adminData.email } });

    const hashedPassword = await hashPassword(adminData.password);

    if (!admin) {
        console.log("👤 Admin inexistant → création...");
        admin = userRepo.create({
            ...adminData,
            password_hash: hashedPassword
        });
    } else {
        console.log("👤 Admin trouvé → mise à jour si nécessaire...");

        // mot de passe changé → rehash
        const isPasswordChanged = !(await hashPassword(adminData.password)) === admin.password_hash;

        Object.assign(admin, {
            ...adminData,
            ...(isPasswordChanged ? { password_hash: hashedPassword } : {})
        });
    }

    await userRepo.save(admin);
    console.log("👤 Admin OK ✔️");

    /* -----------------------------------------------------------------------
       🏁 TRACKS — UPSERT
    ----------------------------------------------------------------------- */

    console.log("🏁 Synchronisation des tracks...");

    for (const t of config.tracks) {
        const existing = await trackRepo.findOne({ where: { name: t.name } });

        if (!existing) {
            await trackRepo.save(trackRepo.create(t));
            console.log(`➕ Track ajouté : ${t.name}`);
        } else {
            await trackRepo.save({ ...existing, ...t });
            console.log(`♻️ Track mis à jour : ${t.name}`);
        }
    }

    /* -----------------------------------------------------------------------
       🚗 CARS — UPSERT
    ----------------------------------------------------------------------- */

    console.log("🚗 Synchronisation des cars...");

    for (const c of config.cars) {
        const existing = await carRepo.findOne({ where: { name: c.name } });

        if (!existing) {
            await carRepo.save(carRepo.create(c));
            console.log(`➕ Car ajoutée : ${c.name}`);
        } else {
            await carRepo.save({ ...existing, ...c });
            console.log(`♻️ Car mise à jour : ${c.name}`);
        }
    }

    console.log("\n🌱 Seed terminé avec succès !");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ ERREUR SEED :", err);
    process.exit(1);
});
