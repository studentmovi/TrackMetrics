"use client";
import React from "react";
import styles from "./liveEngineer.module.scss";

// Components déjà existants
import Header from "@/components/Layout/Header/Header";
import { Footer } from "@/components/Layout/Footer/Footer";
import CarStatus from "@/components/CarStatus/CarStatus";
import Tyres from "@/components/Tyres/Tyres";
import FuelERS from "@/components/FuelERS/FuelERS";
import SessionInfo from "@/components/SessionInfo/SessionInfo";

// Nouveaux composants
import SectorTimes from "@/components/SectorTimes/SectorTimes";
import RaceFlags from "@/components/RaceFlags/RaceFlags";
import CompetitorMap from "@/components/CompetitorMap/CompetitorMap";
import PositionTable from "@/components/PositionTable/PositionTable";

export default function LiveEngineerDashboard() {
    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>

                {/* Bloc CarStatus */}
                <section className={styles.block}>
                    <CarStatus />
                </section>

                {/* Bloc Secteurs */}
                <section className={styles.block}>
                    <SectorTimes />
                </section>

                {/* Bloc Drapeaux */}
                <section className={styles.block}>
                    <RaceFlags />
                </section>

                {/* Bloc Mini-Map */}
                <section className={styles.block}>
                    <CompetitorMap />
                </section>

                {/* Bloc Positions & Gaps */}
                <section className={styles.block}>
                    <PositionTable />
                </section>

                {/* Tyres */}
                <section className={styles.block}>
                    <Tyres />
                </section>

                {/* Fuel & ERS */}
                <section className={styles.block}>
                    <FuelERS />
                </section>

                {/* Info Session */}
                <section className={styles.block}>
                    <SessionInfo />
                </section>

            </main>

            <Footer />
        </div>
    );
}
