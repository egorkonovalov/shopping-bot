import { Clothes, Price, Size } from "../product.model";
import { CreateProductDto } from "./create-product.dto";

export class CreateClothesDto extends CreateProductDto implements Clothes {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly price: Price,
    readonly size: Size) {
    super(id, title, description, price);
  }
}
