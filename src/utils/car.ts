export function getCarCategory(name?: string): "GT" | "LMDH" | "F1" {
    if (!name) {
        return "GT"; // valeur safe par défaut
    }

    const n = name.toLowerCase();

    if (n.includes("gt3") || n.includes("gt4")) return "GT";
    if (n.includes("lmdh") || n.includes("lmp2") || n.includes("lmp")) return "LMDH";
    if (n.includes("f1") || n.includes("formula")) return "F1";

    return "GT";
}
