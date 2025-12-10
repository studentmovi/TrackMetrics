"use client";

import Image from "next/image";
import styles from "./DriverCard.module.scss";

type Props = {
    username: string;
    pilotNumber: number | null;
    flag: string | null;
    avatarUrl: string | null;
    onChangeNumber: () => void;
    onChangeFlag: () => void;
};

export default function DriverCard({
                                       username,
                                       pilotNumber,
                                       flag,
                                       avatarUrl,
                                       onChangeNumber,
                                       onChangeFlag,
                                   }: Props) {
    const colors = ["#ff2d55", "#ff9500", "#ffd60a", "#0a84ff", "#30d158", "#bf5af2", "#ff375f", "#64d2ff"];
    const color = pilotNumber ? colors[pilotNumber % colors.length] : "#999";

    return (
        <div className={styles.driverCard}>
            <Image
                src={avatarUrl || "/default-avatar.png"}
                width={90}
                height={90}
                alt="avatar"
                className={styles.driverAvatar}
            />

            <div className={styles.cardRight}>
                <div className={styles.numberRow}>
                    <span className={styles.number} style={{ color }}>
                        {pilotNumber ?? "--"}
                    </span>
                    <button className={styles.changeBtn} onClick={onChangeNumber}>Change</button>
                </div>

                <div className={styles.username}>{username}</div>

                <div className={styles.flagRow}>
                    <Image
                        src={`/flag/${flag || "fr"}.svg`}
                        width={32}
                        height={20}
                        alt="flag"
                        className={styles.flagIcon}
                    />
                    <button className={styles.changeBtnSmall} onClick={onChangeFlag}>Change flag</button>
                </div>
            </div>
        </div>
    );
}
