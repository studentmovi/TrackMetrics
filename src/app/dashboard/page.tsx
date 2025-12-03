"use client";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

import CarStatus from "@/components/CarStatus/CarStatus";
import DamageModel from "@/components/DamageModel/DamageModel";
import Tyres from "@/components/Tyres/Tyres";
import FuelERS from "@/components/FuelERS/FuelERS";
import SessionInfo from "@/components/SessionInfo/SessionInfo";

import { useFakeTelemetry } from "@/hooks/useFakeTelemetry";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {

    // Change "GT" par "F1" ou "LMDH" pour tout changer d’un coup
    const telem = useFakeTelemetry("GT");

    return (
        <div className={styles.dashboard}>
            <Header />

            <main className={styles.content}>

                <div className={styles.cardWrapper}>
                    <CarStatus
                        speed={Math.floor(telem.speed)}
                        gear={telem.gear}
                        throttle={telem.throttle}
                        brake={telem.brake}
                        rpmPercent={Math.floor(telem.rpmPercent)}
                        ers={Math.floor(telem.ers)}
                    />
                </div>

                <div className={`${styles.cardWrapper} ${styles.full}`}>
                    <DamageModel damage={telem.damage} category={telem.carName} />
                </div>

                <div className={styles.cardWrapper}>
                    <Tyres
                        tyres={telem.tyres}
                        brakes={telem.brakes}
                        carName={telem.carName}
                    />
                </div>

                <div className={styles.cardWrapper}>
                    <FuelERS
                        fuel={telem.fuel}
                        perLap={telem.perLap}
                        ers={telem.ers}
                    />
                </div>

                <div className={styles.cardWrapper}>
                    <SessionInfo
                        currentLap={"1:42.284"}
                        bestLap={"1:37.228"}
                        lastLap={"1:45.552"}
                    />
                </div>

            </main>

            <Footer />
        </div>
    );
}
