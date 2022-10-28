import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductType } from "./product-type.entity";
import { Attribute, Price } from "../product.model";

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

  @ManyToOne(() => ProductType)
  type: number;
}

export class ProductWithAttributes extends Product {
  attributes: Array<Attribute>
}
