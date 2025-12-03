"use client";
import styles from "./DamageModel.module.scss";

export default function DamageModel({ damage, category }) {

    const isF1 = category?.toLowerCase().includes("f1");
    const isLMDH = category?.toLowerCase().includes("lmd");

    function getDamageColor(value: number) {
        if (value < 5) return styles.green;
        if (value < 20) return styles.yellow;
        return styles.red;
    }

    return (
        <div className={styles.card}>
            <h2>Damage Report</h2>

            <div className={styles.damageList}>

                {isF1 && (
                    <>
                        <p><span className={getDamageColor(damage.aero)}>●</span> Front Wing: {damage.aero.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.suspension)}>●</span> Rear Wing: {damage.suspension.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.engine)}>●</span> Engine: {damage.engine.toFixed(0)}%</p>
                    </>
                )}

                {isLMDH && (
                    <>
                        <p><span className={getDamageColor(damage.suspension)}>●</span> Dampers: {damage.suspension.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.gearbox)}>●</span> Hybrid Unit: {damage.gearbox.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.aero)}>●</span> Aero Package: {damage.aero.toFixed(0)}%</p>
                    </>
                )}

                {!isF1 && !isLMDH && (
                    <>
                        <p><span className={getDamageColor(damage.aero)}>●</span> Aero: {damage.aero.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.suspension)}>●</span> Suspension: {damage.suspension.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.engine)}>●</span> Engine: {damage.engine.toFixed(0)}%</p>
                        <p><span className={getDamageColor(damage.gearbox)}>●</span> Gearbox: {damage.gearbox.toFixed(0)}%</p>
                    </>
                )}

            </div>
        </div>
    );
}
