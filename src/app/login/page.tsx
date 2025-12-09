"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import {Footer} from "@/components/Layout/Footer/Footer";


export default function Page() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.animatedBg}></div>
            <div className={styles.glow}></div>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <svg width="48" height="48" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    <h1>TRACKMETRICS</h1>
                </div>
                <h2>Access Your Dashboard</h2>
                <LoginForm />
            </div>
        </div>

    );
}