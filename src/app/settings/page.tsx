"use client";

import { useState, useEffect } from "react";
import styles from "./Settings.module.scss";
import Image from "next/image";
import Footer from "@/components/Layout/Footer/Footer";
import { useAuth } from "@/contexts/AuthContext";

type SettingsDto = {
    username: string;
    email: string;
    avatarUrl: string | null;
    pilotNumber: number | null;
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

    /* ---------------------------------------------
      LOAD TOKEN
    ----------------------------------------------*/
    useEffect(() => {
        const t = localStorage.getItem("tm_token");
        setToken(t);
    }, []);

    /* ---------------------------------------------
      LOAD SETTINGS
    ----------------------------------------------*/
    useEffect(() => {
        if (!token) return;

        const load = async () => {
            try {
                const res = await fetch("/api/settings", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    /* ---------------------------------------------
      UPDATE FIELD
    ----------------------------------------------*/
    const update = (field: keyof SettingsDto, value: any) => {
        setSettings(prev => prev ? { ...prev, [field]: value } : prev);
    };

    /* ---------------------------------------------
      SAVE SETTINGS
    ----------------------------------------------*/
    const save = async () => {
        if (!settings) return;

        setSaving(true);
        setError(null);

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
        } catch (e: any) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    /* ---------------------------------------------
      REGENERATE TOKEN
    ----------------------------------------------*/
    const regenerateToken = async () => {
        if (!token) return;

        try {
            const res = await fetch("/api/settings/telemetry-token", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to regenerate token");

            setSettings(prev => prev ? { ...prev, telemetryToken: json.token } : prev);
        } catch (e: any) {
            setError(e.message);
        }
    };

    /* ---------------------------------------------
      LOADING STATES
    ----------------------------------------------*/
    if (!token) return <div className={styles.loading}>Loading session…</div>;
    if (loading) return <div className={styles.loading}>Loading settings…</div>;
    if (!settings) return <div className={styles.loading}>No settings loaded.</div>;

    const trackingUrl = settings.telemetryToken
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/telemetry/${settings.telemetryToken}`
        : null;

    /* ---------------------------------------------
      PAGE UI
    ----------------------------------------------*/
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1>Driver Profile & Settings</h1>
                <p className={styles.subtitle}>Configure your TrackMetrics profile & telemetry.</p>

                {error && <div className={styles.error}>{error}</div>}

                {/* DRIVER CARD */}
                <section className={styles.section}>
                    <h2>Driver Profile</h2>

                    <DriverCard
                        username={settings.username}
                        pilotNumber={settings.pilotNumber}
                        flag={settings.language}
                        avatarUrl={settings.avatarUrl}
                        onChangeFlag={() => setFlagModal(true)}
                        onChangeNumber={() => setNumberModal(true)}
                    />
                </section>

                {/* Number Modal */}
                <NumberModal
                    open={numberModal}
                    onClose={() => setNumberModal(false)}
                    onSelect={(n) => update("pilotNumber", n)}
                />

                {/* Flag Modal */}
                <FlagModal
                    open={flagModal}
                    onClose={() => setFlagModal(false)}
                    onSelect={(f) => update("language", f)}
                />

                {/* TELEMETRY SECTION */}
                <section className={styles.section}>
                    <h2>Telemetry Token</h2>

                    <div className={styles.apiRow}>
                        <input
                            className={styles.apiInput}
                            readOnly
                            value={settings.telemetryToken || "No token yet"}
                        />
                        <button className={styles.regenBtn} onClick={regenerateToken}>
                            Generate token
                        </button>
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

                    <Toggle
                        label="Flags alerts"
                        value={settings.showFlagsAlerts}
                        onChange={() => update("showFlagsAlerts", !settings.showFlagsAlerts)}
                    />

                    <Toggle
                        label="Fuel alerts"
                        value={settings.showFuelAlerts}
                        onChange={() => update("showFuelAlerts", !settings.showFuelAlerts)}
                    />

                    <Toggle
                        label="Damage alerts"
                        value={settings.showDamageAlerts}
                        onChange={() => update("showDamageAlerts", !settings.showDamageAlerts)}
                    />
                </section>

                {/* UNITS & TIME */}
                <section className={styles.section}>
                    <h2>Units & Time</h2>

                    <OptionRow
                        options={[
                            { value: "metric", label: "KM/H" },
                            { value: "imperial", label: "MPH" },
                        ]}
                        current={settings.units}
                        onChange={(v) => update("units", v)}
                    />

                    <OptionRow
                        options={[
                            { value: "24h", label: "24H" },
                            { value: "12h", label: "12H" },
                        ]}
                        current={settings.timeFormat}
                        onChange={(v) => update("timeFormat", v)}
                    />
                </section>

                {/* GRAPHICS */}
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

                {/* ACTION BUTTONS */}
                <div className={styles.actions}>
                    <button className={styles.saveBtn} onClick={save} disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button className={styles.logoutBtn} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

/* ========================================================================
      SUB COMPONENTS
===========================================================================*/

function DriverCard({ username, pilotNumber, flag, avatarUrl, onChangeNumber, onChangeFlag }) {
    const flagMap = {
        fr: "🇫🇷", gb: "🇬🇧", es: "🇪🇸", de: "🇩🇪", it: "🇮🇹",
        be: "🇧🇪", nl: "🇳🇱", jp: "🇯🇵", us: "🇺🇸", br: "🇧🇷",
        mx: "🇲🇽", au: "🇦🇺"
    };

    const colors = [
        "#ff2d55", "#ff9500", "#ffd60a", "#0a84ff",
        "#30d158", "#bf5af2", "#ff375f", "#64d2ff",
    ];

    const color = pilotNumber
        ? colors[pilotNumber % colors.length]
        : "#999";

    return (
        <div className={styles.driverCard}>
            <Image
                src={avatarUrl || "/default-avatar.png"}
                width={90}
                height={90}
                alt="avatar"
                className={styles.driverAvatar}
            />

            <div className={styles.cardRight}>
                <div className={styles.numberRow}>
                    <span className={styles.number} style={{ color }}>
                        {pilotNumber ?? "--"}
                    </span>
                    <button className={styles.changeBtn} onClick={onChangeNumber}>
                        Change
                    </button>
                </div>

                <div className={styles.username}>{username}</div>

                <div className={styles.flagRow}>
                    <span className={styles.flag}>{flagMap[flag] || "🏳️"}</span>
                    <button className={styles.changeBtnSmall} onClick={onChangeFlag}>
                        Change flag
                    </button>
                </div>
            </div>
        </div>
    );
}

/* NUMBER MODAL */
function NumberModal({ open, onClose, onSelect }) {
    if (!open) return null;

    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
    const colors = [
        "#ff2d55", "#ff9500", "#ffd60a", "#0a84ff",
        "#30d158", "#bf5af2", "#ff375f", "#64d2ff",
    ];

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Select Number</h2>

                <div className={styles.numberGridModal}>
                    {numbers.map(num => (
                        <div
                            key={num}
                            className={styles.numberOption}
                            style={{ borderColor: colors[num % colors.length] }}
                            onClick={() => {
                                onSelect(num);
                                onClose();
                            }}
                        >
                            {num}
                        </div>
                    ))}
                </div>

                <button className={styles.closeBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

/* FLAG MODAL */
function FlagModal({ open, onClose, onSelect }) {
    if (!open) return null;

    const flags = [
        "fr","gb","es","de","it","be","nl","jp","us","br","mx","au"
    ];

    const map = {
        fr:"🇫🇷", gb:"🇬🇧", es:"🇪🇸", de:"🇩🇪",
        it:"🇮🇹", be:"🇧🇪", nl:"🇳🇱", jp:"🇯🇵",
        us:"🇺🇸", br:"🇧🇷", mx:"🇲🇽", au:"🇦🇺",
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Select Flag</h2>

                <div className={styles.flagGridModal}>
                    {flags.map(f => (
                        <div
                            key={f}
                            className={styles.flagOption}
                            onClick={() => {
                                onSelect(f);
                                onClose();
                            }}
                        >
                            {map[f]}
                        </div>
                    ))}
                </div>

                <button className={styles.closeBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

/* TOGGLE */
function Toggle({ label, value, onChange }) {
    return (
        <div className={styles.toggleRow}>
            <span>{label}</span>
            <label className={styles.switch}>
                <input type="checkbox" checked={value} onChange={onChange}/>
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
