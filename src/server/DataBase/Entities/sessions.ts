import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sessions")
export class Session {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    user_id!: number;

    @Column("int")
    track_id!: number;

    @Column("int")
    car_id!: number;

    @Column("varchar", { nullable: true })
    title!: string;

    @Column("varchar", { default: () => "CURRENT_TIMESTAMP" })
    started_at!: string;

    @Column("varchar", { nullable: true })
    ended_at!: string;

    @Column("varchar", { default: "false" })
    is_live!: string;

    @Column("varchar", { nullable: true })
    best_lap_time_ms!: string;

    @Column("varchar", { default: "0" })
    total_laps!: string;

    @Column("varchar", { nullable: true })
    game_session_id!: string;
}
