import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Attribute {

  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: string;

  name: string;
  value: string;
}
