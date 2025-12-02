// app/historic/page.tsx
"use client";
import React from "react";
import styles from "./historic.module.scss";
import SessionHistoryPage from "@/components/SessionHistoryPage/SessionHistoryPage";
import {Footer} from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";

export default function HistoricPage() {
    return (
        <div className={styles.container}>
            <Header />
            <SessionHistoryPage />
            <Footer />

        </div>
    );
}
