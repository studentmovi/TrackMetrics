"use client";
import { useEffect, useState } from "react";

type Category = "GT" | "F1" | "LMDH";

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

// lissage pour éviter les barres qui sautent
function smooth(prev: number, target: number, factor = 0.15) {
    return prev + (target - prev) * factor;
}

// ratios de boîte simplifiés
const gearRatios: Record<Category, number[]> = {
    F1:   [3.4, 2.9, 2.5, 2.2, 1.9, 1.6, 1.3, 1.1],
    GT:   [3.0, 2.6, 2.2, 1.95, 1.7, 1.5],
    LMDH: [3.2, 2.7, 2.3, 2.0, 1.7, 1.45, 1.2],
};

const finalDrive: Record<Category, number> = {
    F1: 3.8,
    GT: 3.2,
    LMDH: 3.6,
};

const maxRpmMap: Record<Category, number> = {
    F1: 15000,
    GT: 7200,
    LMDH: 9000,
};

// calc RPM réel à partir de la vitesse + rapport engagé
function computeRPM(speedKmh: number, gear: number, category: Category): number {
    const ratios = gearRatios[category];
    const fd = finalDrive[category];
    const maxRpm = maxRpmMap[category];

    if (gear < 1 || gear > ratios.length) return 1000;

    const wheelRadius = 0.33; // ~33cm
    const speedMs = speedKmh / 3.6;
    const wheelRpm = (speedMs / (2 * Math.PI * wheelRadius)) * 60;
    const rpm = wheelRpm * ratios[gear - 1] * fd;

    return clamp(rpm, 1000, maxRpm);
}

export function useFakeTelemetry(category: Category = "GT") {
    // Temps de tour réalistes (en secondes)
    const lapTimes: Record<Category, number> = {
        F1: 106.168,   // 1:46.168
        GT: 136.3,     // 2:16.3
        LMDH: 122.7,   // 2:02.7
    };
    const lapTime = lapTimes[category];

    const maxSpeed =
        category === "F1" ? 360 :
            category === "LMDH" ? 320 :
                280;

    // Timeline Spa (0 → 1 = progression dans le tour)
    const spa = [
        { t: 0.00, speed: 80,  throttle: 0.2, brake: 0.9, gear: 2 }, // La Source
        { t: 0.08, speed: 140, throttle: 0.7, brake: 0.0, gear: 3 },
        { t: 0.15, speed: 230, throttle: 1.0, brake: 0.0, gear: 6 }, // descente
        {
            t: 0.20,
            speed: category === "F1" ? 305 : category === "LMDH" ? 275 : 245,
            throttle: 1.0, brake: 0.0, gear: 7,                       // Eau Rouge / Raidillon
        },
        {
            t: 0.27,
            speed: category === "F1" ? 330 : category === "LMDH" ? 300 : 260,
            throttle: 1.0, brake: 0.0, gear: 8,                       // Kemmel
        },
        { t: 0.35, speed: 120, throttle: 0.2, brake: 1.0, gear: 3 },  // Les Combes
        { t: 0.42, speed: 180, throttle: 0.6, brake: 0.1, gear: 5 },  // Malmedy
        { t: 0.50, speed: 90,  throttle: 0.2, brake: 0.8, gear: 2 },  // Bruxelles
        { t: 0.57, speed: 150, throttle: 0.5, brake: 0.1, gear: 4 },  // No Name
        {
            t: 0.65,
            speed: category === "F1" ? 215 : 185,
            throttle: 0.8, brake: 0.1, gear: 6,                       // Pouhon
        },
        { t: 0.73, speed: 170, throttle: 0.5, brake: 0.2, gear: 4 },  // Campus
        { t: 0.80, speed: 190, throttle: 0.7, brake: 0.0, gear: 5 },  // Stavelot
        {
            t: 0.88,
            speed: category === "F1" ? 310 : 260,
            throttle: 1.0, brake: 0.0, gear: 7,                       // Blanchimont
        },
        { t: 0.95, speed: 90,  throttle: 0.1, brake: 1.0, gear: 2 },  // Bus Stop
        { t: 1.00, speed: 200, throttle: 0.8, brake: 0.0, gear: 4 },  // ligne droite
    ];

    const [data, setData] = useState(() => ({
        carName:
            category === "GT" ? "BMW M4 GT3" :
                category === "F1" ? "Mercedes W15" :
                    "Porsche 963 LMDh",

        speed: 0,
        gear: 1,
        throttle: 0,
        brake: 0,

        rpm: 0,          // RPM réel
        rpmPercent: 0,   // pour ta barre

        ers: 80,

        fuel: 60,
        perLap: 2.1,
        lapsRemaining: 28,

        tyres: {
            FL: { temp: 75, pressure: 20.5, wear: 0 },
            FR: { temp: 75, pressure: 20.5, wear: 0 },
            RL: { temp: 72, pressure: 20.4, wear: 0 },
            RR: { temp: 72, pressure: 20.4, wear: 0 },
        },

        brakes: {
            FL: { temp: 320 },
            FR: { temp: 320 },
            RL: { temp: 280 },
            RR: { temp: 280 },
        },

        engineTemp: 95,

        damage: {
            aero: 0,
            engine: 0,
            suspension: 0,
            gearbox: 0,
        },

        session: {
            currentLapTime: 0, // en secondes
            bestLapTime: 0,
            lastLapTime: 0,
            lapCount: 0,
        },
    }));

    useEffect(() => {
        const dt = 0.15; // 150ms
        let currentTime = 0;

        const interval = setInterval(() => {
            currentTime += dt;

            let newLap = false;
            if (currentTime >= lapTime) {
                currentTime -= lapTime;
                newLap = true;
            }

            const lapProgress = currentTime / lapTime;

            // segment Spa correspondant
            let idx = spa.findIndex(p => p.t >= lapProgress);
            if (idx === -1) idx = spa.length - 1;
            const prevPoint = idx === 0 ? spa[spa.length - 1] : spa[idx - 1];
            const nextPoint = spa[idx];

            const segT = (lapProgress - prevPoint.t) / ((nextPoint.t - prevPoint.t) || 0.0001);

            const scriptSpeed = lerp(prevPoint.speed, nextPoint.speed, segT);
            const scriptThrottle = lerp(prevPoint.throttle, nextPoint.throttle, segT);
            const scriptBrake = lerp(prevPoint.brake, nextPoint.brake, segT);
            const scriptGear = Math.round(lerp(prevPoint.gear, nextPoint.gear, segT));

            setData(prev => {
                const targetSpeed = scriptSpeed;
                const targetThrottle = clamp(scriptThrottle, 0, 1);
                const targetBrake = clamp(scriptBrake, 0, 1);
                const targetGear = scriptGear;

                // lissage progressif
                const speed = smooth(prev.speed, targetSpeed, 0.25);
                const throttle = smooth(prev.throttle, targetThrottle, 0.35);
                const brake = smooth(prev.brake, targetBrake, 0.35);
                const gear = targetGear;

                // RPM réel depuis boîte + vitesse
                const baseRpm = computeRPM(speed, gear, category);
                const maxRpm = maxRpmMap[category];
                // petit bonus de rpm si plein gaz pour que ça "monte plus vite"
                const rpm = smooth(prev.rpm, baseRpm + throttle * 400, 0.3);
                const rpmPercent = clamp((rpm / maxRpm) * 100, 0, 100);

                // fuel
                const fuel = Math.max(3, prev.fuel - 0.01);
                const lapsRemaining = fuel / prev.perLap;

                // PNEUS
                const maxTyreTemp =
                    category === "F1" ? 105 :
                        category === "LMDH" ? 100 : 95;

                const baseCooling = speed > 220 ? 2.2 : speed > 120 ? 1.2 : 0.5;
                const heatFromThrottle = throttle > 0.6 ? throttle * 0.8 : throttle * 0.3;
                const heatFromBrakeFront = brake * 0.9;
                const heatFromBrakeRear = brake * 0.4;

                function updateTyre(temp: number, wear: number, isFront: boolean) {
                    let t = temp;

                    // virage / traction
                    t += heatFromThrottle * (isFront ? 1.4 : 1.0);

                    // freinage (peu d’impact sur le pneu)
                    if (brake > 0.4) {
                        t += (isFront ? heatFromBrakeFront : heatFromBrakeRear);
                    }

                    // refroidissement
                    t -= baseCooling;

                    t = clamp(t, 60, maxTyreTemp);

                    // usure
                    let w = wear + (t > 85 ? 0.001 : 0.0005);
                    w = clamp(w, 0, 100);

                    return { temp: t, wear: w };
                }

                const fl = updateTyre(prev.tyres.FL.temp, prev.tyres.FL.wear, true);
                const fr = updateTyre(prev.tyres.FR.temp, prev.tyres.FR.wear, true);
                const rl = updateTyre(prev.tyres.RL.temp, prev.tyres.RL.wear, false);
                const rr = updateTyre(prev.tyres.RR.temp, prev.tyres.RR.wear, false);

                const tyres = {
                    FL: { temp: fl.temp, pressure: 20.5, wear: fl.wear },
                    FR: { temp: fr.temp, pressure: 20.5, wear: fr.wear },
                    RL: { temp: rl.temp, pressure: 20.4, wear: rl.wear },
                    RR: { temp: rr.temp, pressure: 20.4, wear: rr.wear },
                };

                // FREINS
                function updateBrakeTemp(temp: number, isFront: boolean) {
                    let t = temp;

                    if (brake > 0.2) {
                        t += brake * (isFront ? 140 : 90); // chauffe
                    }

                    const cool = speed > 200 ? 80 : speed > 100 ? 40 : 20;
                    t -= cool;

                    const maxBrake = category === "F1" ? 900 : 650;
                    t = clamp(t, 150, maxBrake);

                    return t;
                }

                const brakes = {
                    FL: { temp: updateBrakeTemp(prev.brakes.FL.temp, true) },
                    FR: { temp: updateBrakeTemp(prev.brakes.FR.temp, true) },
                    RL: { temp: updateBrakeTemp(prev.brakes.RL.temp, false) },
                    RR: { temp: updateBrakeTemp(prev.brakes.RR.temp, false) },
                };

                // moteur
                let engineTemp = prev.engineTemp;
                engineTemp += throttle * 0.3;
                engineTemp -= speed > 220 ? 0.3 : 0.1;
                engineTemp = clamp(engineTemp, 90, 145);

                // ERS (surtout F1)
                let ers = prev.ers;
                if (category === "F1") {
                    ers += brake * 3.5;      // regen
                    ers -= throttle * 2.5;   // conso
                    ers = clamp(ers, 0, 100);
                }

                // SESSION / LAPS
                let currentLapTime = prev.session.currentLapTime + dt;
                let bestLapTime = prev.session.bestLapTime;
                let lastLapTime = prev.session.lastLapTime;
                let lapCount = prev.session.lapCount;

                if (newLap) {
                    const finished = prev.session.currentLapTime;
                    lapCount += 1;
                    lastLapTime = finished || lapTime;
                    if (bestLapTime === 0 || finished < bestLapTime) {
                        bestLapTime = finished;
                    }
                    currentLapTime = 0;
                }

                return {
                    ...prev,
                    speed,
                    gear,
                    throttle,
                    brake,
                    rpm,
                    rpmPercent,
                    fuel,
                    lapsRemaining,
                    tyres,
                    brakes,
                    engineTemp,
                    ers,
                    session: {
                        currentLapTime,
                        bestLapTime,
                        lastLapTime,
                        lapCount,
                    },
                };
            });
        }, 150);

        return () => clearInterval(interval);
    }, [category, lapTime, maxSpeed]);

    return data;
}
