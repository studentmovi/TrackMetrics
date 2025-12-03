"use client";
import React, { useContext } from "react";
import styles from "./positionTable.module.scss";
import { TelemetryContext } from "@/providers/TelemetryProvider";

export default function PositionTable() {
    const data = useContext(TelemetryContext);

    if (!data) return <p>Waiting telemetry...</p>;

    return (
        <div>
            <h2>Positions & Gaps</h2>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Driver</th>
                    <th>Gap</th>
                    <th>Last Lap</th>
                </tr>
                </thead>

                <tbody>
                {data.positions.map((p, i) => (
                    <tr key={i}>
                        <td>{p.pos}</td>
                        <td>{p.driver}</td>
                        <td>{p.gap}</td>
                        <td className={p.isBad ? styles.red : ""}>{p.lastLap}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
