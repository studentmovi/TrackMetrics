import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_settings")
export class UserSettings {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    user_id!: number;

    @Column("varchar", { default: "dark" })
    theme!: string;

    @Column("varchar", { default: "true" })
    show_flags_alerts!: string;

    @Column("varchar", { default: "true" })
    show_fuel_alerts!: string;

    @Column("varchar", { default: "true" })
    show_damage_alerts!: string;

    @Column("varchar", { default: "metric" })
    units!: string;

    @Column("varchar", { default: "24h" })
    time_format!: string; // "24h" | "12h"

    @Column("varchar", { default: "fr" })
    language!: string;

    @Column("int", { default: 50 })
    graphics_quality!: number;
}
