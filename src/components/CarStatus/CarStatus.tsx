"use client";
import styles from "./CarStatus.module.scss";

export default function CarStatus() {
    return (
        <div className={styles.card}>
            <div className={styles.statsGrid}>
                <div className={styles.metric}>
                    <p className={styles.label}>Speed</p>
                    <h2>324</h2>
                    <span>km/h</span>
                </div>

                <div className={styles.metric}>
                    <p className={styles.label}>Gear</p>
                    <h2>8</h2>
                    <span>Gear</span>
                </div>
            </div>

            <div className={styles.bars}>
                <div className={styles.bar}>
                    <p>RPM</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.rpm}`}></div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <p>Throttle</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.throttle}`}></div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <p>Brake</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.brake}`}></div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <p>ERS</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.ers}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
