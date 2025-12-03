export function getLapsRemaining(fuel: number, perLap: number) {
    if (perLap <= 0) return 0;
    return (fuel / perLap).toFixed(1);
}
