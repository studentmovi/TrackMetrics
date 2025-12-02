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
}
