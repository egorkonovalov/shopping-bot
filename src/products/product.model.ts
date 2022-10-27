export type Price = { amount: number, currency: string };

export type Attribute = {
  key: string,
  value: string
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: Price;
  attributes: Array<Attribute>
}
