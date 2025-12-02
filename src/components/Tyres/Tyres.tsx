"use client";
import styles from "./Tyres.module.scss";

export default function Tyres() {
    return (
        <div className={styles.card}>
            <h2>Tyres</h2>

            <div className={styles.grid}>
                <div className={styles.tyre}>
                    <h3>Front Left</h3>
                    <p>101°C</p>
                    <p>20.6 psi</p>
                </div>

                <div className={styles.tyre}>
                    <h3>Front Right</h3>
                    <p>104°C</p>
                    <p>20.7 psi</p>
                </div>

                <div className={styles.tyre}>
                    <h3>Rear Left</h3>
                    <p>102°C</p>
                    <p>20.4 psi</p>
                </div>

                <div className={`${styles.tyre} ${styles.bad}`}>
                    <h3>Rear Right</h3>
                    <p>112°C</p>
                    <p>20.3 psi</p>
                </div>
            </div>
        </div>
    );
}
