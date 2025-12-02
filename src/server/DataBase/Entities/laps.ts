import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("laps")
export class Lap {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    session_id!: number;

    @Column("varchar")
    lap_number!: string;

    @Column("varchar")
    time_ms!: string;

    @Column("varchar", { nullable: true })
    s1_ms!: string;

    @Column("varchar", { nullable: true })
    s2_ms!: string;

    @Column("varchar", { nullable: true })
    s3_ms!: string;

    @Column("varchar", { default: "true" })
    valid!: string;

    @Column("varchar", { default: "false" })
    is_best_lap!: string;

    @Column("varchar", { nullable: true })
    tyre_compound!: string;

    @Column("varchar", { nullable: true })
    fuel_start_l!: string;

    @Column("varchar", { nullable: true })
    fuel_end_l!: string;
}
