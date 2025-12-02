import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("alerts")
export class Alert {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    session_id!: number;

    @Column("int", { nullable: true })
    lap_id!: number | null;

    @Column("varchar")
    type!: string;

    @Column("varchar")
    timestamp_ms!: string;

    @Column("varchar", { nullable: true })
    message!: string;
}
