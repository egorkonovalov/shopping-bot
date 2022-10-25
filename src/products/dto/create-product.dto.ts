import type { Product, Price } from '../product.model'
import { IsNotEmpty } from 'class-validator'

export class CreateProductDto implements Product {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  typeId: string;
  price: Price;
  attributes: [];
}
