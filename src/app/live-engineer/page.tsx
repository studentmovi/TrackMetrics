"use client";
import React from "react";
import styles from "./liveEngineer.module.scss";

import Header from "@/components/Layout/Header/Header";
import { Footer } from "@/components/Layout/Footer/Footer";
import CarStatus from "@/components/CarStatus/CarStatus";
import Tyres from "@/components/Tyres/Tyres";
import FuelERS from "@/components/FuelERS/FuelERS";
import SessionInfo from "@/components/SessionInfo/SessionInfo";

import SectorTimes from "@/components/SectorTimes/SectorTimes";
import RaceFlags from "@/components/RaceFlags/RaceFlags";
import CompetitorMap from "@/components/CompetitorMap/CompetitorMap";
import PositionTable from "@/components/PositionTable/PositionTable";

import { useFakeTelemetry } from "@/hooks/useFakeTelemetry";

export default function LiveEngineerDashboard() {
    const telemetry = useFakeTelemetry("GT");

    // Sécurité : si le hook renvoie rien (rare mais possible)
    if (!telemetry) {
        return (
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <p style={{ color: "#fff" }}>Waiting for telemetry data...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>

                {/* Bloc CarStatus */}
                <section className={styles.block}>
                    <CarStatus
                        speed={telemetry.speed}
                        rpm={telemetry.rpm}
                        gear={telemetry.gear}
                        throttle={telemetry.throttle}
                        brake={telemetry.brake}
                    />
                </section>

                {/* Bloc Secteurs */}
                <section className={styles.block}>
                    <SectorTimes session={telemetry.session} />
                </section>

                {/* Bloc Drapeaux */}
                <section className={styles.block}>
                    <RaceFlags />
                </section>

                {/* Bloc Mini-Map */}
                <section className={styles.block}>
                    <CompetitorMap />
                </section>

                {/* Bloc Positions */}
                <section className={styles.block}>
                    <PositionTable />
                </section>

                {/* Tyres */}
                <section className={styles.block}>
                    <Tyres tyres={telemetry.tyres} brakes={telemetry.brakes} />
                </section>

                {/* Fuel & ERS */}
                <section className={styles.block}>
                    <FuelERS fuel={telemetry.fuel} ers={telemetry.ers} />
                </section>

                {/* Info Session */}
                <section className={styles.block}>
                    <SessionInfo session={telemetry.session} />
                </section>

            </main>

            <Footer />
        </div>
    );
}
