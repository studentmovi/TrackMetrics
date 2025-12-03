"use client";
import { useState, useEffect } from "react";
import styles from "./Settings.module.scss";
import Image from "next/image";
import Footer from "@/components/Layout/Footer/Footer";

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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<SettingsDto | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/settings");
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
    }, []);

    const update = (field: keyof SettingsDto, value: any) => {
        setSettings(prev => prev ? { ...prev, [field]: value } : prev);
    };

    const save = async () => {
        if (!settings) return;
        setSaving(true);
        setError(null);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
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

    const regenerateToken = async () => {
        try {
            const res = await fetch("/api/settings/telemetry-token", { method: "POST" });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to regenerate token");

            setSettings(prev => prev ? { ...prev, telemetryToken: json.token } : prev);
        } catch (e: any) {
            setError(e.message);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading settings…</div>;
    }

    if (!settings) {
        return <div className={styles.loading}>No settings loaded.</div>;
    }

    const trackingUrl = settings.telemetryToken
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/telemetry/${settings.telemetryToken}`
        : null;

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1>Driver Profile & Settings</h1>
                <p className={styles.subtitle}>
                    Configure your TrackMetrics profile, telemetry link and dashboard preferences.
                </p>

                {error && <div className={styles.error}>{error}</div>}

                {/* USER SECTION */}
                <section className={styles.section}>
                    <h2>Driver Profile</h2>
                    <div className={styles.userRow}>
                        <div className={styles.avatarWrapper}>
                            <Image
                                src={settings.avatarUrl || "/default-avatar.png"}
                                width={80}
                                height={80}
                                alt="Avatar"
                                className={styles.avatar}
                            />
                            <AvatarUploader
                                onAvatarChange={(url) => update("avatarUrl", url)}
                            />
                        </div>

                        <div className={styles.userFields}>
                            <label className={styles.label}>
                                Username
                                <input
                                    className={styles.input}
                                    value={settings.username}
                                    onChange={(e) => update("username", e.target.value)}
                                />
                            </label>

                            <label className={styles.label}>
                                Email
                                <input
                                    className={styles.input}
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => update("email", e.target.value)}
                                />
                            </label>

                            <label className={styles.label}>
                                Driver Number
                                <input
                                    className={styles.input}
                                    type="number"
                                    min={1}
                                    max={999}
                                    value={settings.pilotNumber ?? ""}
                                    onChange={(e) =>
                                        update("pilotNumber", e.target.value ? Number(e.target.value) : null)
                                    }
                                    placeholder="e.g. 44"
                                />
                            </label>
                        </div>
                    </div>

                    <FlagSelector
                        flag={settings.language}
                        setFlag={(lang: string) => update("language", lang)}
                    />
                </section>

                {/* API & TELEMETRY */}
                <section className={styles.section}>
                    <h2>Telemetry Link</h2>
                    <p className={styles.help}>
                        Generate a unique telemetry token to connect your tracking app or SimHub to this account.
                    </p>

                    <div className={styles.apiRow}>
                        <input
                            className={styles.apiInput}
                            readOnly
                            value={settings.telemetryToken || "No token generated yet"}
                        />
                        <button
                            className={styles.regenBtn}
                            onClick={regenerateToken}
                            type="button"
                        >
                            Generate Token
                        </button>
                    </div>

                    {trackingUrl && (
                        <div className={styles.trackingUrlBox}>
                            <span>Tracking URL</span>
                            <code>{trackingUrl}</code>
                            <p className={styles.helpSmall}>
                                Use this URL or token in your tracking app configuration.
                            </p>
                        </div>
                    )}
                </section>

                {/* DASHBOARD OPTIONS */}
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

                <section className={styles.section}>
                    <h2>Units & Time</h2>

                    <div className={styles.optionGroup}>
                        <span className={styles.label}>Speed Unit</span>
                        <OptionRow
                            options={[
                                { value: "metric", label: "KM/H" },
                                { value: "imperial", label: "MPH" },
                            ]}
                            current={settings.units}
                            onChange={(v) => update("units", v)}
                        />
                    </div>

                    <div className={styles.optionGroup}>
                        <span className={styles.label}>Time Format</span>
                        <OptionRow
                            options={[
                                { value: "24h", label: "24H" },
                                { value: "12h", label: "12H" },
                            ]}
                            current={settings.timeFormat}
                            onChange={(v) => update("timeFormat", v)}
                        />
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Theme & Graphics</h2>

                    <div className={styles.optionGroup}>
                        <span className={styles.label}>Theme</span>
                        <OptionRow
                            options={[
                                { value: "light", label: "Light" },
                                { value: "dark", label: "Dark" },
                                { value: "system", label: "System" },
                            ]}
                            current={settings.theme}
                            onChange={(v) => update("theme", v)}
                        />
                    </div>

                    <div className={styles.optionGroup}>
                        <span className={styles.label}>Graphics Quality</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={settings.graphicsQuality}
                            onChange={(e) => update("graphicsQuality", Number(e.target.value))}
                            className={styles.range}
                        />
                    </div>
                </section>

                <div className={styles.actions}>
                    <button
                        className={styles.saveBtn}
                        onClick={save}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
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

function OptionRow({
                       options,
                       current,
                       onChange,
                   }: {
    options: { value: string; label: string }[];
    current: string;
    onChange: (val: string) => void;
}) {
    return (
        <div className={styles.optionRow}>
            {options.map(opt => (
                <button
                    key={opt.value}
                    className={current === opt.value ? styles.activeOpt : ""}
                    onClick={() => onChange(opt.value)}
                    type="button"
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

function FlagSelector({ flag, setFlag }: { flag: string; setFlag: (v: string) => void }) {
    return (
        <div className={styles.flagPicker}>
            <h3>Country / Language</h3>
            <select value={flag} onChange={(e) => setFlag(e.target.value)}>
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="de">🇩🇪 Deutsch</option>
            </select>
        </div>
    );
}

function AvatarUploader({ onAvatarChange }: { onAvatarChange: (url: string) => void }) {
    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        onAvatarChange(url);
        // si plus tard tu veux uploader vers un storage, c'est ici
    };

    return (
        <div className={styles.avatarUploader}>
            <label>
                Change Avatar
                <input type="file" accept="image/*" onChange={upload} />
            </label>
        </div>
    );
}
