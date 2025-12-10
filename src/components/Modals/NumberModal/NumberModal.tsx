"use client";

import styles from "./NumberModal.module.scss";

type Props = {
    onClose: () => void;
    onSelect: (num: number) => void;
};

export default function NumberModal({ onClose, onSelect }: Props) {
    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Select your race number</h2>

                <div className={styles.grid}>
                    {numbers.map(n => (
                        <div
                            key={n}
                            className={styles.numberItem}
                            onClick={() => {
                                onSelect(n);
                                onClose();
                            }}
                        >
                            {n}
                        </div>
                    ))}
                </div>

                <button className={styles.closeBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
