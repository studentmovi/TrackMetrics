"use client";
import Image from "next/image";
import styles from "./DamageModel.module.scss";
import carImg from "@/assets/car_damage_model.png";

export default function DamageModel() {
    return (
        <div className={styles.card}>
            <h2>Damage Report</h2>

            <Image src={carImg} alt="Car Damage" className={styles.carImg} />

            <div className={styles.damageList}>
                <p><span className={styles.green}>●</span> Front Wing: OK (2%)</p>
                <p><span className={styles.yellow}>●</span> Suspension: Light (8%)</p>
                <p><span className={styles.red}>●</span> Floor: Heavy (23%)</p>
                <p><span className={styles.green}>●</span> Engine: OK (0%)</p>
            </div>
        </div>
    );
}
