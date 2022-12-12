export type Price = { amount: number, currency: string };

export type Attribute = {
  name: string,
  value: string
}

export type ProductType = {
  id: number,
  name: string
}

export interface Product {
  id: string;
  title: string;
  description: string;
  typeId: ProductType["id"];
  price: Price;
  attributes: Array<Attribute>
}
