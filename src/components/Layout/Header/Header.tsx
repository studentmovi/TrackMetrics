"use client";
import { useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Header({ rightContent }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // 👉 Le Header récupère le user GLOBAL
    const { user } = useAuth();

    return (
        <header className={styles.header}>
            {/* BURGER */}
            <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* TITLE */}
            <h1 className={styles.title}>TrackMetrics</h1>

            {/* USER + RIGHT SLOT */}
            <div className={styles.userBlock}>

                {rightContent && (
                    <div className={styles.rightSlot}>
                        {rightContent}
                    </div>
                )}

                {/* FLAG */}
                <Image
                    src={`/flag/${user?.driverFlag || "fr"}.svg`}
                    alt="flag"
                    width={22}
                    height={22}
                    className={styles.flag}
                    onError={(e) => { e.currentTarget.src = "/flags/fr.svg"; }}
                />

                {/* USER INFO */}
                <div className={styles.info}>
                    <p className={styles.username}>{user?.username || "Guest"}</p>
                    {user?.driverNumber && <p className={styles.number}>#{user.driverNumber}</p>}
                </div>

                {/* AVATAR */}
                <Image
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    width={42}
                    height={42}
                    className={styles.avatar}
                />
            </div>

            {/* SLIDE MENU */}
            <nav className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
                <a href="/dashboard">Dashboard</a>
                <a href="/live-engineer">Live Telemetry</a>
                <a href="/historic">Session History</a>
                <a href="/settings">Settings</a>
                <a href="/join-code">Join With Code</a>
            </nav>
        </header>
    );
}
