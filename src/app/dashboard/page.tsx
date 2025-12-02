"use client";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

import CarStatus from "@/components/CarStatus/CarStatus";
import DamageModel from "@/components/DamageModel/DamageModel";
import Tyres from "@/components/Tyres/Tyres";
import FuelERS from "@/components/FuelERS/FuelERS";
import SessionInfo from "@/components/SessionInfo/SessionInfo";

export default function DashboardPage() {
    return (
        <div style={{ background: "#0c1a24", minHeight: "100vh", color: "white" }}>
            <Header />

            <main style={{ padding: "15px" }}>
                <CarStatus />
                <DamageModel />
                <Tyres />
                <FuelERS />
                <SessionInfo />
            </main>

            <Footer />
        </div>
    );
}
