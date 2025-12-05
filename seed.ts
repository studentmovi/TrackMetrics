import "reflect-metadata";
import "dotenv/config";
import { initDb } from "./src/server/DataBase/initDb";
import { User, Track, Car } from "./src/server/DataBase/Entities";
import { hashPassword } from "./src/server/utils/hash";

async function seed() {
    const db = await initDb();

    console.log("🔄 Reset de la base...");
    await db.synchronize(true); // RESET COMPLET

    const userRepo = db.getRepository(User);
    const trackRepo = db.getRepository(Track);
    const carRepo = db.getRepository(Car);

    /* -----------------------------------------------------------------------
       👤 CRÉATION DE L’ADMIN
    ----------------------------------------------------------------------- */

    const hashedPassword = await hashPassword("3rW@N!23");

    const admin = userRepo.create({
        email: "admin@tm.io",
        username: "admin",
        password_hash: hashedPassword,

        // --- CHAMPS SETTINGS ---
        avatarUrl: null,
        pilotNumber: 44,         // Exemple
        driverFlag: "fr",        // 🇫🇷 FRANCE

        telemetryToken: null,
        simhubToken: null,

        theme: "dark",
        units: "metric",
        timeFormat: "24h",

        showFlagsAlerts: true,
        showFuelAlerts: true,
        showDamageAlerts: true,

        graphicsQuality: 80,
    });

    await userRepo.save(admin);
    console.log("👤 Admin créé ✔️");

    /* -----------------------------------------------------------------------
       🏁 INSERT TRACKS
    ----------------------------------------------------------------------- */

    await trackRepo.insert([
        { name: "Monza", game: "ACC", length_km: 5.79 },
        { name: "Spa-Francorchamps", game: "ACC", length_km: 7.00 },
        { name: "Silverstone", game: "ACC", length_km: 5.89 },
    ]);

    console.log("🏁 Tracks insérés ✔️");

    /* -----------------------------------------------------------------------
       🚗 INSERT CARS
    ----------------------------------------------------------------------- */

    await carRepo.insert([
        { name: "Ferrari 488 GT3 Evo", category: "GT3", game: "ACC" },
        { name: "Porsche 911 GT3 R", category: "GT3", game: "ACC" },
        { name: "Lamborghini Huracán GT3 Evo", category: "GT3", game: "ACC" },
    ]);

    console.log("🚗 Cars insérées ✔️");

    console.log("\n🌱 Seed terminé avec succès !");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ ERREUR SEED :", err);
    process.exit(1);
});
