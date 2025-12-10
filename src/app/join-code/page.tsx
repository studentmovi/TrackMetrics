"use client";

import { useState } from "react";
import styles from "./JoinLiveSession.module.scss";

export default function JoinLiveSession() {
    const [code, setCode] = useState("");

    const handleConnect = () => {
        if (!code.trim()) return;
        console.log("Connecting with code:", code);
        // 👉 Logic: call API, WS connect, redirect, etc.
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1>Join Live Session</h1>
                <p>
                    Enter your session code to connect to<br />
                    the live telemetry feed.
                </p>

                <label htmlFor="session">Session Code</label>
                <input
                    id="session"
                    type="text"
                    placeholder="Enter code here"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <button onClick={handleConnect}>
                    Connect
                </button>
            </div>
        </div>
    );
}
