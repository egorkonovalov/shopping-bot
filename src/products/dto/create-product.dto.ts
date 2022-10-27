import type { Product as IProduct, Price, Attribute } from '../product.model'
import { IsNotEmpty } from 'class-validator'

export class CreateProductDto implements IProduct {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  typeId: string;
  price: Price;
  attributes: Array<Attribute>;
}
