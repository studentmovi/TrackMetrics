"use client";
import { useState } from "react";
import styles from "./Settings.module.scss";
import Image from "next/image";
import Footer from "@/components/Layout/Footer/Footer";

export default function SettingsPage() {
    const [apiToken, setApiToken] = useState("****************");
    const [pitLimiter, setPitLimiter] = useState(true);
    const [fuelWarning, setFuelWarning] = useState(true);
    const [theme, setTheme] = useState("dark");
    const [graphics, setGraphics] = useState(50);

    const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph">("kmh");
    const [timeFormat, setTimeFormat] = useState<"24h" | "12h">("24h");
    const [language, setLanguage] = useState("fr");
    const [avatar, setAvatar] = useState("/default-avatar.png");
    const [flag, setFlag] = useState("fr");
    const [username, setUsername] = useState("Alex_Vettel_44");
    const [email, setEmail] = useState("alex.v@simracingpro.io");
    const [password, setPassword] = useState("");

    const regenerateToken = () => {
        setApiToken(Math.random().toString(36).slice(2, 18));
    };

    return (
        <div className={styles.container}>
            <h1>Profile & Settings</h1>

            {/* --- USER SECTION --- */}
            <div className={styles.userSection}>
                <Image src={avatar} width={80} height={80} alt="Avatar" className={styles.avatar} />

                <div className={styles.userInfo}>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        type="email"
                    />

                    <input
                        placeholder="Change password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <AvatarUploader avatar={avatar} setAvatar={setAvatar} />
            <FlagSelector flag={flag} setFlag={setFlag} />

            {/* --- API --- */}
            <h2>API & Connectivity</h2>
            <div className={styles.apiBox}>
                <input
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    type="text"
                    className={styles.apiInput}
                />
                <button onClick={regenerateToken} className={styles.regenBtn}>
                    Régénérer token
                </button>
            </div>

            {/* --- DASHBOARD SETTINGS --- */}
            <h2>Dashboard Settings</h2>

            <div className={styles.toggleRow}>
                <span>Pit Limiter Alert</span>
                <label className={styles.switch}>
                    <input type="checkbox" checked={pitLimiter} onChange={() => setPitLimiter(!pitLimiter)} />
                    <span className={styles.slider}></span>
                </label>
            </div>

            <div className={styles.toggleRow}>
                <span>Low Fuel Warning</span>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={fuelWarning}
                        onChange={() => setFuelWarning(!fuelWarning)}
                    />
                    <span className={styles.slider}></span>
                </label>
            </div>

            {/* --- SPEED UNIT --- */}
            <h2>Speed Unit</h2>
            <div className={styles.optionRow}>
                <button
                    className={speedUnit === "kmh" ? styles.activeOpt : ""}
                    onClick={() => setSpeedUnit("kmh")}
                >
                    KM/H
                </button>
                <button
                    className={speedUnit === "mph" ? styles.activeOpt : ""}
                    onClick={() => setSpeedUnit("mph")}
                >
                    MPH
                </button>
            </div>

            {/* --- TIME FORMAT --- */}
            <h2>Time Format</h2>
            <div className={styles.optionRow}>
                <button
                    className={timeFormat === "24h" ? styles.activeOpt : ""}
                    onClick={() => setTimeFormat("24h")}
                >
                    24H
                </button>
                <button
                    className={timeFormat === "12h" ? styles.activeOpt : ""}
                    onClick={() => setTimeFormat("12h")}
                >
                    12H
                </button>
            </div>

            {/* --- LANGUAGE --- */}
            <h2>Language</h2>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={styles.select}
            >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
            </select>

            {/* --- THEME --- */}
            <h2>Theme</h2>
            <div className={styles.optionRow}>
                <button className={theme === "light" ? styles.activeOpt : ""} onClick={() => setTheme("light")}>
                    Light
                </button>
                <button className={theme === "dark" ? styles.activeOpt : ""} onClick={() => setTheme("dark")}>
                    Dark
                </button>
                <button className={theme === "system" ? styles.activeOpt : ""} onClick={() => setTheme("system")}>
                    System
                </button>
            </div>

            {/* --- GRAPHICS --- */}
            <h2>Graphics Quality</h2>
            <input
                type="range"
                value={graphics}
                onChange={(e) => setGraphics(Number(e.target.value))}
                className={styles.range}
            />

            {/* --- ACTIONS --- */}
            <button className={styles.saveBtn}>Save Changes</button>
            <button className={styles.logoutBtn}>Logout</button>
            <Footer />
        </div>

    );
}

function FlagSelector({ flag, setFlag }: any) {
    return (
        <div className={styles.flagPicker}>
            <h3>Country Flag</h3>
            <select value={flag} onChange={(e) => setFlag(e.target.value)}>
                <option value="fr">🇫🇷 France</option>
                <option value="uk">🇬🇧 United Kingdom</option>
                <option value="us">🇺🇸 USA</option>
                <option value="de">🇩🇪 Germany</option>
            </select>
        </div>
    );
}

function AvatarUploader({ avatar, setAvatar }: any) {
    const upload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatar(URL.createObjectURL(file));
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
