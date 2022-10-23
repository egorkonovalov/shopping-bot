import type { Product, Price } from '../product.model'

export class CreateProductDto implements Product {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly price: Price) { };
}
