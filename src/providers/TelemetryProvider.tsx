"use client";

import React, { createContext, useEffect, useState } from "react";

export const TelemetryContext = createContext<any>(null);
const DEFAULT_WS_URL = "ws://localhost:8000";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || DEFAULT_WS_URL;
export function TelemetryProvider({ children, sessionCode }: any) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!sessionCode) return;

        const ws = new WebSocket(
            `${WS_URL}/api/ws/telemetry/${sessionCode}`
        );

        ws.onmessage = (event) => {
            try {
                const packet = JSON.parse(event.data);
                setData(packet);
            } catch (e) {
                console.error("Invalid telemetry packet", e);
            }
        };

        ws.onerror = (err) => {
            console.error("Telemetry WS error:", err);
        };

        return () => {
            ws.close();
        };
    }, [sessionCode]);

    return (
        <TelemetryContext.Provider value={data}>
            {children}
        </TelemetryContext.Provider>
    );
}
