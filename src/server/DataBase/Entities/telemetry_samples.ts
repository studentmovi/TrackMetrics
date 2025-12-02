import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("telemetry_samples")
export class TelemetrySample {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    session_id!: number;

    @Column("int", { nullable: true })
    lap_id!: number | null;

    @Column("varchar")
    timestamp_ms!: string;

    @Column("varchar", { nullable: true })
    distance_m!: string;

    @Column("varchar")
    speed_kph!: string;

    @Column("varchar")
    rpm!: string;

    @Column("varchar")
    gear!: string;

    @Column("varchar")
    throttle_pct!: string;

    @Column("varchar")
    brake_pct!: string;

    @Column("varchar", { nullable: true })
    steering_deg!: string;

    @Column("varchar", { nullable: true })
    fuel_l!: string;

    @Column("varchar", { nullable: true })
    tyre_wear_fl!: string;

    @Column("varchar", { nullable: true })
    tyre_wear_fr!: string;

    @Column("varchar", { nullable: true })
    tyre_wear_rl!: string;

    @Column("varchar", { nullable: true })
    tyre_wear_rr!: string;

    @Column("varchar", { nullable: true })
    tyre_temp_fl!: string;

    @Column("varchar", { nullable: true })
    tyre_temp_fr!: string;

    @Column("varchar", { nullable: true })
    tyre_temp_rl!: string;

    @Column("varchar", { nullable: true })
    tyre_temp_rr!: string;

    @Column("varchar", { nullable: true })
    damage_front!: string;

    @Column("varchar", { nullable: true })
    damage_rear!: string;

    @Column("varchar", { nullable: true })
    damage_left!: string;

    @Column("varchar", { nullable: true })
    damage_right!: string;
}
