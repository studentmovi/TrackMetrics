"use client";
import styles from "./FuelERS.module.scss";
import { getLapsRemaining } from "@/utils/fuel";

export default function FuelERS({ fuel, perLap, ers }) {
    const lapsRemaining = getLapsRemaining(fuel, perLap);

    return (
        <div className={styles.card}>
            <h2>Fuel & ERS</h2>

            <div className={styles.fuelBox}>
                <p>Fuel Remaining: <strong>{fuel.toFixed(1)} L</strong></p>
                <p>Consumption: <strong>{perLap.toFixed(2)} L/lap</strong></p>
                <p>Laps Remaining: <strong>{lapsRemaining}</strong></p>
            </div>

            <div className={styles.barSection}>
                <p>ERS Charge</p>
                <div className={styles.barBg}>
                    <div className={`${styles.fill} ${styles.ers}`} style={{ width: ers + "%" }} />
                </div>
                <p className={styles.percent}>{ers}%</p>
            </div>
        </div>
    );
}
