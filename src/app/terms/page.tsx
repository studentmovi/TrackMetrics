// app/terms/page.tsx
"use client";

import { useState } from "react";
import styles from "./terms.module.scss";

export default function TermsPage() {
    const [showConfirm, setShowConfirm] = useState(false);

    const redirectAfterChoice = () => {
        const isAuthenticated =
            localStorage.getItem("isAuthenticated") === "true";

        window.location.href = isAuthenticated ? "/dashboard" : "/login";
    };

    const acceptTerms = () => {
        localStorage.setItem("acceptedTerms", "true");
        redirectAfterChoice();
    };

    const refuseTerms = () => {
        setShowConfirm(true);
    };

    const confirmRefuse = () => {
        localStorage.setItem("acceptedTerms", "false");
        redirectAfterChoice();
    };

    return (
        <div className={styles.container}>
            <h1>Terms of Use — TrackMetrics</h1>
            <p className={styles.date}>Last updated: January 2025</p>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    TrackMetrics is a telemetry and data-analysis platform designed for simracers,
                    teams, engineers, and creators. The platform is developed and maintained by
                    <strong> Erwan (Independent Developer)</strong>.
                </p>
                <p>
                    TrackMetrics processes <strong>only telemetry data coming directly from the game</strong>,
                    such as lap times, sectors, speed, inputs, fuel, damage, tyres, and session information.
                    No personal data unrelated to gameplay is ever collected.
                </p>
                <p>
                    Hosting services are provided by Hostinger International Ltd,
                    61 Lordou Vironos Street, 6023 Larnaca, Cyprus.
                </p>
            </section>

            <section>
                <h2>2. Eligibility</h2>
                <ul>
                    <li>Be at least 16 years old</li>
                    <li>Agree to these Terms of Use</li>
                    <li>Create a valid user account</li>
                </ul>
            </section>

            <section>
                <h2>3. Acceptable Use</h2>
                <ul>
                    <li>Copy, reproduce, or redistribute TrackMetrics</li>
                    <li>Reverse engineer or extract any part of the platform</li>
                    <li>Bypass Premium features</li>
                    <li>Use the service for malicious purposes</li>
                    <li>Collect data without permission</li>
                    <li>Resell or share account access</li>
                </ul>
                <p>
                    Violations may result in account termination and legal action.
                </p>
            </section>

            <section>
                <h2>4. Premium Features</h2>
                <p>
                    Premium access is personal, non-transferable, and non-refundable unless
                    required by law.
                </p>
            </section>

            <section>
                <h2>5. Intellectual Property</h2>
                <p>
                    All TrackMetrics content is protected by intellectual property laws.
                </p>
                <p><strong>
                    Any unauthorized reuse is strictly prohibited.
                </strong></p>
            </section>

            <section>
                <h2>6. User Data & Privacy</h2>
                <ul>
                    <li>Email and basic user identifiers</li>
                    <li>Profile preferences</li>
                    <li>
                        <strong>Non-sensitive telemetry data</strong>
                        <ul style={{ marginTop: "10px" }}>
                            <li>Lap times</li>
                            <li>Inputs</li>
                            <li>ERS & fuel</li>
                            <li>Tyres & damage</li>
                            <li>Timing & session data</li>
                        </ul>
                    </li>
                </ul>
                <p>
                    No personal files, chats, microphone or system data are collected.
                </p>
            </section>

            <section>
                <h2>7. Disclaimer</h2>
                <p>TrackMetrics is provided “as is”.</p>
            </section>

            <section>
                <h2>8. Liability</h2>
                <p>The developer is not liable for indirect damages.</p>
            </section>

            <section>
                <h2>9. Termination</h2>
                <p>Accounts may be terminated if Terms are violated.</p>
            </section>

            <section>
                <h2>10. Changes</h2>
                <p>Terms may be updated at any time.</p>
            </section>

            <section>
                <h2>11. Contact</h2>
                <p>
                    Legal & support:
                    <br /><strong>[Add your email / Discord]</strong>
                </p>
            </section>

            {/* ACTIONS */}
            <div className={styles.actions}>
                <button onClick={refuseTerms} className={styles.refuseBtn}>
                    Refuse Terms
                </button>

                <button onClick={acceptTerms} className={styles.acceptBtn}>
                    Accept Terms
                </button>
            </div>

            {/* CONFIRM MODAL */}
            {showConfirm && (
                <div className={styles.confirmOverlay}>
                    <div className={styles.confirmModal}>
                        <h3>Are you sure?</h3>
                        <p>
                            If you refuse the Terms of Use, this page will still appear
                            in the future.
                        </p>

                        <div className={styles.confirmActions}>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className={styles.cancelBtn}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmRefuse}
                                className={styles.confirmRefuseBtn}
                            >
                                Yes, refuse
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className={styles.footer}>
                TrackMetrics © All Rights Reserved
            </footer>
        </div>
    );
}
