"use client";

import { useState, useEffect } from "react";

import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

import CarStatus from "@/components/CarStatus/CarStatus";
import DamageModel from "@/components/DamageModel/DamageModel";
import Tyres from "@/components/Tyres/Tyres";
import FuelERS from "@/components/FuelERS/FuelERS";
import SessionInfo from "@/components/SessionInfo/SessionInfo";

import { useFakeTelemetry } from "@/hooks/useFakeTelemetry";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {

    const telem = useFakeTelemetry("GT");

    const [token, setToken] = useState<string | null>(null);
    const [loadingShare, setLoadingShare] = useState(false);
    const [shareCode, setShareCode] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("tm_token"));
    }, []);

    // --------- SHARE SESSION HANDLER ----------
    const handleShare = async () => {
        if (!token) return alert("Not logged in.");

        try {
            setLoadingShare(true);

            // 1️⃣ Create session
            const sessionRes = await fetch("/api/sessions", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });

            const sessionJson = await sessionRes.json();
            if (!sessionRes.ok) throw new Error(sessionJson.error);
            const sessionId = sessionJson.session_id;

            // 2️⃣ Create join-code
            const codeRes = await fetch(`/api/sessions/${sessionId}/join-code`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });

            const codeJson = await codeRes.json();
            if (!codeRes.ok) throw new Error(codeJson.error);

            setShareCode(codeJson.code);

        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoadingShare(false);
        }
    };

    return (
        <div className={styles.dashboard}>
            <Header
                rightContent={
                    <button className={styles.shareBtn} onClick={handleShare}>
                        Share
                    </button>
                }
            />
            <main className={styles.content}>

                <div className={styles.cardWrapper}>
                    <CarStatus
                        speed={Math.floor(telem.speed)}
                        gear={telem.gear}
                        throttle={telem.throttle}
                        brake={telem.brake}
                        rpmPercent={Math.floor(telem.rpmPercent)}
                        ers={Math.floor(telem.ers)}
                    />
                </div>

                <div className={`${styles.cardWrapper} ${styles.full}`}>
                    <DamageModel
                        damage={telem.damage}
                        category={telem.carName}
                    />
                </div>

                <div className={styles.cardWrapper}>
                    <Tyres
                        tyres={telem.tyres}
                        brakes={telem.brakes}
                        carName={telem.carName}
                    />
                </div>

                <div className={styles.cardWrapper}>
                    <FuelERS
                        fuel={telem.fuel}
                        perLap={telem.perLap}
                        ers={telem.ers}
                    />
                </div>

                <div className={styles.cardWrapper}>
                    <SessionInfo
                        currentLap={"1:42.284"}
                        bestLap={"1:37.228"}
                        lastLap={"1:45.552"}
                    />
                </div>

            </main>

            <Footer />
        </div>
    );
}
