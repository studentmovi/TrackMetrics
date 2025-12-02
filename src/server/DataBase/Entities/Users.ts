import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { unique: true })
    email!: string;

    @Column("varchar", { unique: true })
    username!: string;

    @Column("varchar")
    password_hash!: string;

    @Column("varchar", { nullable: true })
    avatar_url!: string;

    @Column("varchar", { nullable: true })
    simhub_token!: string;

    @Column("varchar", { default: "false" })
    is_admin!: string;

    @Column("varchar", { default: () => "CURRENT_TIMESTAMP" })
    created_at!: string;

    @Column("varchar", { nullable: true })
    telemetry_token!: string;
}
