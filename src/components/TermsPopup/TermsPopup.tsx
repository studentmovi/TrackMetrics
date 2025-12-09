"use client";

import { useState, useEffect } from "react";
import styles from "./TermsPopup.module.scss";

export default function TermsPopup() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("acceptedTerms");
        if (accepted !== "true") setVisible(true);
    }, []);

    const acceptTerms = () => {
        localStorage.setItem("acceptedTerms", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Terms of Use</h2>

                <p className={styles.subtitle}>
                    Before continuing, please review and accept the TrackMetrics Terms of Use.
                </p>

                <ul className={styles.points}>
                    <li>We only process non-sensitive telemetry from your game.</li>
                    <li>No personal files, chat logs, or system data are collected.</li>
                    <li>Accepting the Terms is required to use TrackMetrics.</li>
                </ul>

                <div className={styles.actions}>
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className={styles.readBtn}>
                        Read Terms
                    </a>

                    <button onClick={acceptTerms} className={styles.acceptBtn}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
