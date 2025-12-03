"use client";

import styles from "./Tyres.module.scss";
import { getTyreColor } from "@/utils/tyres";
import { getBrakeColor } from "@/utils/brakes";
import { getCarCategory } from "@/utils/car";

export default function Tyres({ tyres, brakes, carName }) {
    const category = getCarCategory(carName);

    return (
        <div className={styles.card}>
            <h2>Tyres & Brakes</h2>

            <div className={styles.grid}>
                {["FL", "FR", "RL", "RR"].map((pos) => {
                    // @ts-ignore
                    const t = tyres[pos];
                    // @ts-ignore
                    const b = brakes[pos];

                    const tyreColor = styles[getTyreColor(t.temp, category)];
                    const brakeColor = styles[getBrakeColor(b.temp, category)];

                    return (
                        <div key={pos} className={`${styles.tyre} ${tyreColor}`}>
                            <h3>{pos}</h3>
                            <p>{t.temp.toFixed(0)}°C</p>
                            <p>{t.pressure.toFixed(1)} psi</p>
                            <p className={styles.wear}>Wear: {t.wear.toFixed(1)}%</p>

                            <div className={`${styles.brakeDisk} ${brakeColor}`}>
                                <span>{b.temp.toFixed(0)}°C</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
