import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tracks")
export class Track {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    name!: string;

    @Column("varchar", { nullable: true })
    game!: string;

    @Column("varchar", { nullable: true })
    country!: string;

    @Column("varchar", { nullable: true })
    length_km!: string;

    @Column("varchar", { nullable: true })
    map_image_url!: string;
}
