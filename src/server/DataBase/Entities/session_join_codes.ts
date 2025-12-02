import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("session_join_codes")
export class SessionJoinCode {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    session_id!: number;

    @Column("varchar")
    code!: string;

    @Column("varchar")
    expires_at!: string;

    @Column("varchar", { default: "false" })
    is_revoked!: string;
}
