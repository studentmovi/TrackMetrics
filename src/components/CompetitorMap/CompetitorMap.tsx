"use client";
import React, { useContext } from "react";
import styles from "./competitorMap.module.scss";
import { TelemetryContext } from "@/providers/TelemetryProvider";

export default function CompetitorMap() {
    const data = useContext(TelemetryContext);

    if (!data) return <p>Waiting telemetry...</p>;

    return (
        <div>
            <h2>Competitor Map</h2>
            <div className={styles.map}>
                {data.mapPositions.map((pos, i) => (
                    <div
                        key={i}
                        className={styles.car}
                        style={{ left: pos.x + "%", top: pos.y + "%" }}
                    >
                        {pos.car}
                    </div>
                ))}
            </div>
        </div>
    );
}
