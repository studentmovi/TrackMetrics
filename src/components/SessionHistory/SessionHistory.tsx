"use client";
import React from "react";
import "./SessionHistory.scss";

export const SessionHistory = () => {
    const laps = [
        { lap: 5, s1: "31.201", s2: "41.896", s3: "26.005", total: "1:39.102", delta: "-0.240" },
        { lap: 6, s1: "31.301", s2: "41.999", s3: "26.050", total: "1:40.320", delta: "+1.218" },
        { lap: 7, s1: "31.400", s2: "42.200", s3: "26.300", total: "1:41.000", delta: "+0.500" }
    ];

    return (
        <div className="session-container">
            <h2>Monza | Ferrari 488 GT3 Evo</h2>

            <div className="laps-table">
                <table>
                    <thead>
                    <tr>
                        <th>Lap</th>
                        <th>S1</th>
                        <th>S2</th>
                        <th>S3</th>
                        <th>Total</th>
                        <th>Δ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {laps.map((lap, i) => (
                        <tr key={i} className={lap.delta.startsWith('+') ? "slower" : "faster"}>
                            <td>{lap.lap}</td>
                            <td>{lap.s1}</td>
                            <td>{lap.s2}</td>
                            <td>{lap.s3}</td>
                            <td>{lap.total}</td>
                            <td>{lap.delta}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
