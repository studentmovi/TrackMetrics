import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @Column("varchar", { nullable: true })
  game!: string;

  @Column("varchar", { nullable: true })
  category!: string;
}
