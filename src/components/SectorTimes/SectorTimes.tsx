"use client";
import React, { useContext } from "react";
import styles from "./sectorTimes.module.scss";
import { TelemetryContext } from "@/providers/TelemetryProvider";

export default function SectorTimes() {
    const data = useContext(TelemetryContext);

    if (!data) return <p>Waiting telemetry...</p>;

    const getColor = (type: string) => {
        if (type === "purple") return styles.purple;
        if (type === "green") return styles.green;
        return styles.yellow;
    };

    return (
        <div className={styles.container}>
            <h2>Sector Times</h2>
            <div className={styles.sectors}>
                {["s1", "s2", "s3"].map((s) => (
                    <div key={s} className={styles.sector}>
                        <p>{s.toUpperCase()}</p>
                        <span className={`${styles.time} ${getColor(data.sectors[s].type)}`}>
                            {data.sectors[s].time.toFixed(3)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
