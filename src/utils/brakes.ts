export function getBrakeColor(temp: number, category: "GT" | "LMDH" | "F1") {

    if (category === "GT") {
        if (temp < 200) return "blue";
        if (temp < 350) return "green";
        if (temp < 500) return "yellow";
        return "red";
    }

    if (category === "LMDH") {
        if (temp < 250) return "blue";
        if (temp < 450) return "green";
        if (temp < 650) return "yellow";
        return "red";
    }

    // F1 (disques carbone)
    if (temp < 300) return "blue";
    if (temp < 600) return "green";
    if (temp < 900) return "yellow";
    return "red";
}
