// app/terms/page.tsx
"use client";

import styles from "./terms.module.scss";

export default function TermsPage() {
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
                <p>To use TrackMetrics, you must:</p>
                <ul>
                    <li>Be at least 16 years old</li>
                    <li>Agree to these Terms of Use</li>
                    <li>Create a valid user account</li>
                </ul>
            </section>

            <section>
                <h2>3. Acceptable Use</h2>
                <p>You agree NOT to:</p>
                <ul>
                    <li>Copy, reproduce, or redistribute TrackMetrics in any form</li>
                    <li>Reverse engineer or extract any part of the platform</li>
                    <li>Bypass or attempt to bypass Premium features</li>
                    <li>Use the service for malicious or unauthorized purposes</li>
                    <li>Collect data without permission</li>
                    <li>Resell or share your account access</li>
                </ul>
                <p>
                    Violations may result in account termination, data removal, legal prosecution,
                    and DMCA takedown requests.
                </p>
            </section>

            <section>
                <h2>4. Premium Features</h2>
                <p>
                    TrackMetrics offers optional Premium features. Premium access is personal,
                    non-transferable, and may not be resold. Refunds are not guaranteed unless
                    required by applicable law.
                </p>
            </section>

            <section>
                <h2>5. Intellectual Property</h2>
                <p>
                    TrackMetrics, including but not limited to source code, UI/UX design,
                    dashboards, widgets, assets, branding, systems, and documentation, is fully
                    protected by international copyright and intellectual property law.
                </p>
                <p><strong>
                    Any reproduction, extraction, redistribution, or reuse — in whole or in part —
                    is strictly prohibited.
                </strong></p>
                <p>
                    Violations may lead to civil and criminal liability, including DMCA takedowns
                    and legal action.
                </p>
            </section>

            <section>
                <h2>6. User Data & Privacy</h2>
                <p>
                    TrackMetrics collects only the minimal data required for the service to operate.
                    This includes:
                </p>

                <ul>
                    <li>Email and basic user identifiers</li>
                    <li>Profile preferences (units, language, avatar, pilot number, etc.)</li>
                    <li>
                        <strong>Non-sensitive telemetry data coming directly from the game</strong>,
                        including but not limited to:
                        <ul style={{ marginTop: "10px" }}>
                            <li>Lap times and sector times</li>
                            <li>Speed, throttle and brake inputs</li>
                            <li>ERS usage and fuel levels</li>
                            <li>Tyre temperatures and pressures</li>
                            <li>Car damage and mechanical status</li>
                            <li>Car position, delta and timing data</li>
                            <li>Track, session type and game metadata</li>
                        </ul>
                    </li>
                </ul>

                <p>
                    TrackMetrics does <strong>not</strong> collect personal files, chat logs, microphone
                    input, system data, GPS information, or anything outside the telemetry stream that
                    the user intentionally sends.
                </p>

                <p>
                    Data is stored in Europe through Hostinger’s infrastructure.
                    No data is sold or shared with third parties.
                    Users may request deletion of their account and data at any time.
                </p>
            </section>

            <section>
                <h2>7. Disclaimer of Warranty</h2>
                <p>
                    TrackMetrics is provided “as is” without any warranty. The developer is not
                    responsible for telemetry misinterpretation, gameplay issues, data inaccuracies,
                    or any damage resulting from service usage.
                </p>
            </section>

            <section>
                <h2>8. Limitation of Liability</h2>
                <p>
                    TrackMetrics and its developer are not liable for indirect damages, data loss,
                    downtime, or issues caused by external telemetry tools or third-party software.
                </p>
            </section>

            <section>
                <h2>9. Account Termination</h2>
                <p>
                    Accounts may be suspended or terminated if Terms are violated, illegal activity
                    is detected, or Premium access is abused. Users may request account deletion at any time.
                </p>
            </section>

            <section>
                <h2>10. Changes to These Terms</h2>
                <p>
                    Terms may be updated at any time. Continued use of the platform implies acceptance
                    of the latest version.
                </p>
            </section>

            <section>
                <h2>11. Contact</h2>
                <p>
                    For legal inquiries or support, please contact:
                    <br /> <strong>[Add your email / Discord link here]</strong>
                </p>
            </section>

            <footer className={styles.footer}>
                TrackMetrics © All Rights Reserved — Unauthorized copying or reuse is prohibited.
            </footer>
        </div>
    );
}
