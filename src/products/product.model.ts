export type Price = { amount: number, currency: string };
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: Price;
}

export interface Clothes extends Product {
  size: Size
}
