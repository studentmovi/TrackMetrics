"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./FlagModal.module.scss";

type Props = {
    onClose: () => void;
    onSelect: (flag: string) => void;
};

const ALL_FLAGS = [
    "ad","ae","af","ag","ai","al","am","ao","aq","ar","as","at","au","aw","ax","az",
    "ba","bb","bd","be","bf","bg","bh","bi","bj","bl","bm","bn","bo","bq","br","bs",
    "bt","bv","bw","by","bz","ca","cc","cd","cf","cg","ch","ci","ck","cl","cm","cn",
    "co","cr","cu","cv","cw","cx","cy","cz","de","dj","dk","dm","do","dz","ec","ee",
    "eg","eh","er","es","et","fi","fj","fk","fm","fo","fr","ga","gb","gd","ge","gf",
    "gg","gh","gi","gl","gm","gn","gp","gq","gr","gs","gt","gu","gw","gy","hk","hm",
    "hn","hr","ht","hu","id","ie","il","im","in","io","iq","ir","is","it","je","jm",
    "jo","jp","ke","kg","kh","ki","km","kn","kp","kr","kw","ky","kz","la","lb","lc",
    "li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mf","mg","mh","mk",
    "ml","mm","mn","mo","mp","mq","mr","ms","mt","mu","mv","mw","mx","my","mz","na",
    "nc","ne","nf","ng","ni","nl","no","np","nr","nu","nz","om","pa","pe","pf","pg",
    "ph","pk","pl","pm","pn","pr","ps","pt","pw","py","qa","re","ro","rs","ru","rw",
    "sa","sb","sc","sd","se","sg","sh","si","sj","sk","sl","sm","sn","so","sr","ss",
    "st","sv","sx","sy","sz","tc","td","tf","tg","th","tj","tk","tl","tm","tn","to",
    "tr","tt","tv","tw","tz","ua","ug","um","us","uy","uz","va","vc","ve","vg","vi",
    "vn","vu","wf","ws","xk","ye","yt","za","zm","zw"
];

export default function FlagModal({ onClose, onSelect }: Props) {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Petit délai pour afficher le loader
    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(t);
    }, []);

    const filtered = ALL_FLAGS.filter(code =>
        code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>Select your flag</h2>

                <input
                    type="text"
                    placeholder="Search country…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.flagSearch}
                />

                {isLoading ? (
                    <div className={styles.loader}>Loading flags…</div>
                ) : (
                    <div className={styles.flagGrid}>
                        {filtered.map(code => (
                            <button
                                key={code}
                                className={styles.flagItem}
                                onClick={() => {
                                    onSelect(code);
                                    onClose();
                                }}
                            >
                                <Image
                                    src={`/flag/${code}.svg`}
                                    alt={code}
                                    width={40}
                                    height={30}
                                    className={styles.flagIcon}
                                    onError={(e) => {
                                        // fallback si le svg est éclaté
                                        (e.target as HTMLImageElement).style.opacity = "0.3";
                                    }}
                                />
                                <span>{code.toUpperCase()}</span>
                            </button>
                        ))}
                    </div>
                )}

                <button className={styles.closeBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
