export { User } from "./Users";
export { UserSettings } from "./User_settings";
export { Session } from "./sessions";
export { Lap } from "./laps";
export { Track } from "./tracks";
export { Car } from "./cars";
export { TelemetrySample } from "./telemetry_samples";
export { SessionJoinCode } from "./session_join_codes";
export { Alert } from "./alerts";

export const entities = [
    require("./Users").User,
    require("./User_settings").UserSettings,
    require("./sessions").Session,
    require("./laps").Lap,
    require("./tracks").Track,
    require("./cars").Car,
    require("./telemetry_samples").TelemetrySample,
    require("./session_join_codes").SessionJoinCode,
    require("./alerts").Alert,
];
