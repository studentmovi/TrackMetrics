"use client";
import styles from "./SessionInfo.module.scss";

export default function SessionInfo({ currentLap, bestLap, lastLap }) {
    return (
        <div className={styles.card}>
            <h2>Session Info</h2>

            <div className={styles.line}>
                <p>Current Lap:</p>
                <strong>{currentLap}</strong>
            </div>

            <div className={styles.line}>
                <p>Best Lap:</p>
                <strong>{bestLap}</strong>
            </div>

            <div className={`${styles.line} ${styles.bad}`}>
                <p>Last Lap:</p>
                <strong>{lastLap}</strong>
            </div>
        </div>
    );
}
