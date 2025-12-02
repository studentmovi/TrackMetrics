"use client";
import styles from "./FuelERS.module.scss";

export default function FuelERS() {
    return (
        <div className={styles.card}>
            <h2>Fuel & ERS</h2>

            <div className={styles.fuelBox}>
                <p>Fuel Remaining <strong>45.5 L</strong></p>
                <p>Consumption <strong>1.62 L/lap</strong></p>
            </div>

            <div className={styles.barSection}>
                <p>ERS Charge</p>
                <div className={styles.barBg}>
                    <div className={`${styles.fill} ${styles.ers}`}></div>
                </div>
                <p className={styles.percent}>88%</p>
            </div>
        </div>
    );
}
