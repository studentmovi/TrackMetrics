"use client";
import styles from "./SessionInfo.module.scss";

export default function SessionInfo() {
    return (
        <div className={styles.card}>
            <h2>Session Info</h2>

            <div className={styles.line}>
                <p>Current Lap:</p>
                <strong>1:49.481</strong>
            </div>

            <div className={styles.line}>
                <p>Best Lap:</p>
                <strong>1:27.880</strong>
            </div>

            <div className={`${styles.line} ${styles.bad}`}>
                <p>Last Lap:</p>
                <strong>1:49.142</strong>
            </div>
        </div>
    );
}
