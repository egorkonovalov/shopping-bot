import type { ProductType as IProductType } from '../product.model'
import { IsNotEmpty } from 'class-validator'

export class CreateProductTypeDto implements IProductType {
  id: number;

  @IsNotEmpty()
  name: string;
}
