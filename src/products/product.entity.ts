import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./product.model";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'varchar', nullable: false })
  price: Price;

  @Column()
  typeId: string;
}
