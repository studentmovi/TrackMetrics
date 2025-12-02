"use client";
import { useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header({ user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            {/* BURGER */}
            <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* TITLE */}
            <h1 className={styles.title}>Live Engineer</h1>

            {/* USER */}
            <div className={styles.userBlock}>
                <Image
                    src={`/flags/${user?.country || "unknown"}.svg`}
                    alt="flag"
                    width={22}
                    height={22}
                    className={styles.flag}
                />

                <div className={styles.info}>
                    <p className={styles.username}>{user?.username || "Guest"}</p>
                    {user?.driverNumber && <p className={styles.number}>#{user.driverNumber}</p>}
                </div>

                <Image
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    width={42}
                    height={42}
                    className={styles.avatar}
                />
            </div>

            {/* MENU */}
            <nav className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
                <a href="/dashboard">Dashboard</a>
                <a href="/live">Live Telemetry</a>
                <a href="/historic">Session History</a>
                <a href="/settings">Settings</a>
                <a href="/join-code">Join With Code</a>
            </nav>
        </header>
    );
}
