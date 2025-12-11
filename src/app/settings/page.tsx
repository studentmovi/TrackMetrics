"use client";

import { useState, useEffect } from "react";
import styles from "./Settings.module.scss";

import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

import DriverCard from "@/components/DriverCard/DriverCard";
import NumberModal from "@/components/Modals/NumberModal/NumberModal";
import FlagModal from "@/components/Modals/FlagModal/FlagModal";

import { useAuth } from "@/contexts/AuthContext";

type SettingsDto = {
    id: number;
    username: string;
    email: string;
    avatarUrl: string | null;
    pilotNumber: number | null;
    driverFlag: string | null;
    telemetryToken: string | null;
    simhubToken: string | null;

    theme: string;
    showFlagsAlerts: boolean;
    showFuelAlerts: boolean;
    showDamageAlerts: boolean;
    units: string;
    timeFormat: string;
    language: string;
    graphicsQuality: number;
};

export default function SettingsPage() {
    const [token, setToken] = useState<string | null>(null);
    const [settings, setSettings] = useState<SettingsDto | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [numberModal, setNumberModal] = useState(false);
    const [flagModal, setFlagModal] = useState(false);

    const { logout } = useAuth();

    const [success, setSuccess] = useState<string | null>(null);

    /* LOAD TOKEN */
    useEffect(() => {
        setToken(localStorage.getItem("tm_token"));
    }, []);

    /* LOAD SETTINGS */
    useEffect(() => {
        if (!token) return;

        const load = async () => {
            try {
                const res = await fetch("/api/settings", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const json = await res.json();
                if (!res.ok) throw new Error(json.error || "Failed to load settings");

                setSettings(json);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [token]);

    /* UPDATE FIELD */
    const update = (field: keyof SettingsDto, value: any) => {
        setSettings(prev => prev ? { ...prev, [field]: value } : prev);
    };

    /* SAVE SETTINGS */
    const saveSettings = async () => {
        if (!settings) return;

        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(settings),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to save settings");

            setSettings(json);
            setSuccess("Settings successfully saved ✔");

            // auto-hide après 3 sec
            setTimeout(() => setSuccess(null), 3000);

        } catch (e: any) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    /* REGENERATE TELEMETRY TOKEN */
    const regenerateToken = async () => {
        if (!token) return;

        try {
            const res = await fetch("/api/settings/telemetry-token", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error);

            setSettings(prev => prev ? { ...prev, telemetryToken: json.token } : prev);
        } catch (e: any) {
            setError(e.message);
        }
    };

    if (!token) return <div className={styles.loading}>Loading session…</div>;
    if (loading) return <div className={styles.loading}>Loading settings…</div>;
    if (!settings) return <div className={styles.loading}>No settings loaded.</div>;

    const trackingUrl =
        settings.telemetryToken &&
        `${typeof window !== "undefined" ? window.location.origin : ""}/telemetry/${settings.telemetryToken}`;

    return (
        <div className={styles.page}>
            <Header />

            <div className={styles.content}>
                <div className={styles.card}>
                    <h1>Driver Profile & Settings</h1>
                    <p className={styles.subtitle}>Configure your TrackMetrics profile & telemetry.</p>

                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}

                    {/* DRIVER CARD */}
                    <section className={styles.section}>
                        <h2>Driver Profile</h2>

                        <DriverCard
                            username={settings.username}
                            pilotNumber={settings.pilotNumber}
                            flag={settings.driverFlag || "fr"}
                            avatarUrl={settings.avatarUrl}
                            onChangeNumber={() => setNumberModal(true)}
                            onChangeFlag={() => setFlagModal(true)}
                        />
                    </section>

                    {/* ACCOUNT */}
                    <section className={styles.section}>
                        <h2>Account</h2>

                        <div className={styles.formGroup}>
                            <label>Username</label>
                            <input
                                type="text"
                                value={settings.username}
                                onChange={(e) => update("username", e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => update("email", e.target.value)}
                            />
                        </div>

                        <div className={styles.accountActions}>
                            <button className={styles.secondaryBtn}>Change password</button>
                        </div>
                    </section>

                    {/* TELEMETRY */}
                    <section className={styles.section}>
                        <h2>Telemetry Token</h2>

                        <div className={styles.apiRow}>
                            <input className={styles.apiInput} readOnly value={settings.telemetryToken || "No token"} />
                            <button className={styles.regenBtn} onClick={regenerateToken}>Generate</button>
                        </div>

                        {trackingUrl && (
                            <div className={styles.trackingUrlBox}>
                                <span>Tracking URL</span>
                                <code>{trackingUrl}</code>
                            </div>
                        )}
                    </section>

                    {/* ALERTS */}
                    <section className={styles.section}>
                        <h2>Dashboard Alerts</h2>

                        <Toggle label="Flags alerts" value={settings.showFlagsAlerts}
                                onChange={() => update("showFlagsAlerts", !settings.showFlagsAlerts)} />
                        <Toggle label="Fuel alerts" value={settings.showFuelAlerts}
                                onChange={() => update("showFuelAlerts", !settings.showFuelAlerts)} />
                        <Toggle label="Damage alerts" value={settings.showDamageAlerts}
                                onChange={() => update("showDamageAlerts", !settings.showDamageAlerts)} />
                    </section>

                    {/* UNITS */}
                    <section className={styles.section}>
                        <h2>Units & Time</h2>

                        <OptionRow
                            options={[{ value: "metric", label: "KM/H" }, { value: "imperial", label: "MPH" }]}
                            current={settings.units}
                            onChange={(v) => update("units", v)}
                        />

                        <OptionRow
                            options={[{ value: "24h", label: "24H" }, { value: "12h", label: "12H" }]}
                            current={settings.timeFormat}
                            onChange={(v) => update("timeFormat", v)}
                        />
                    </section>

                    {/* THEMES */}
                    <section className={styles.section}>
                        <h2>Theme & Graphics</h2>

                        <OptionRow
                            options={[
                                { value: "light", label: "Light" },
                                { value: "dark", label: "Dark" },
                                { value: "system", label: "System" },
                            ]}
                            current={settings.theme}
                            onChange={(v) => update("theme", v)}
                        />

                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={settings.graphicsQuality}
                            onChange={(e) => update("graphicsQuality", Number(e.target.value))}
                            className={styles.range}
                        />
                    </section>

                    {/* ACTIONS */}
                    <div className={styles.actions}>
                        <button className={styles.saveBtn} onClick={saveSettings} disabled={saving}>
                            {saving ? "Saving…" : "Save Changes"}
                        </button>

                        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {numberModal && (
                <NumberModal
                    onClose={() => setNumberModal(false)}
                    onSelect={(n) => update("pilotNumber", n)}
                />
            )}

            {flagModal && (
                <FlagModal
                    onClose={() => setFlagModal(false)}
                    onSelect={(f) => update("driverFlag", f)}
                />
            )}

            <Footer />
        </div>
    );
}

/* TOGGLE */
function Toggle({ label, value, onChange }) {
    return (
        <div className={styles.toggleRow}>
            <span>{label}</span>
            <label className={styles.switch}>
                <input type="checkbox" checked={value} onChange={onChange} />
                <span className={styles.slider}></span>
            </label>
        </div>
    );
}

/* OPTION ROW */
function OptionRow({ options, current, onChange }) {
    return (
        <div className={styles.optionRow}>
            {options.map(o => (
                <button
                    key={o.value}
                    className={current === o.value ? styles.activeOpt : ""}
                    onClick={() => onChange(o.value)}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}
