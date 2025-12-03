"use client";
import styles from "./CarStatus.module.scss";

export default function CarStatus({ speed, gear, throttle, brake, rpmPercent, ers }) {
    return (
        <div className={styles.card}>

            <div className={styles.statsGrid}>
                <div className={styles.metric}>
                    <p className={styles.label}>Speed</p>
                    <h2>{speed}</h2>
                    <span>km/h</span>
                </div>

                <div className={styles.metric}>
                    <p className={styles.label}>Gear</p>
                    <h2>{gear}</h2>
                    <span>Gear</span>
                </div>
            </div>

            <div className={styles.bars}>

                <div className={styles.bar}>
                    <p>RPM</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.rpm}`} style={{ width: rpmPercent + "%" }}></div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <p>Throttle</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.throttle}`} style={{ width: throttle * 100 + "%" }}></div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <p>Brake</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.brake}`} style={{ width: brake * 100 + "%" }}></div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <p>ERS</p>
                    <div className={styles.barBg}>
                        <div className={`${styles.fill} ${styles.ers}`} style={{ width: ers + "%" }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
