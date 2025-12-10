"use client";

import React from "react";
import styles from "./raceFlags.module.scss";

export default function RaceFlags() {
    // Exemple : tu pourras remplacer ça par tes données télémétrie plus tard
    const activeFlags = ["green", "yellow"];
    // → "green", "yellow", "blue", "red"

    return (
        <div>
            <h2>Race Flags</h2>

            <div className={styles.flags}>
                {activeFlags.length === 0 && <p>No active flags</p>}

                {activeFlags.map((flag, index) => (
                    <div
                        key={index}
                        className={`${styles.flag} ${styles[flag]}`}
                    >
                        {flag.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
}
