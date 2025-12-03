export function getTyreColor(temp: number, category: "GT" | "LMDH" | "F1") {

    if (category === "GT") {
        if (temp < 60) return "blue";
        if (temp < 75) return "lightgreen";
        if (temp < 90) return "green";
        if (temp < 100) return "yellow";
        return "red";
    }

    if (category === "LMDH") {
        if (temp < 65) return "blue";
        if (temp < 80) return "lightgreen";
        if (temp < 95) return "green";
        if (temp < 105) return "yellow";
        return "red";
    }

    // F1
    if (temp < 70) return "blue";
    if (temp < 95) return "green";
    if (temp < 105) return "brightgreen";
    if (temp < 110) return "yellow";
    return "red";
}
