import { Injectable } from '@nestjs/common';
import type { Clothes, Price, Product } from './product.model';
import { v4 as uuid } from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { GetClothesFilterDto } from './dto/get-clothes-filter.dto';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductsWithFilters(filterDto: GetProductFilterDto | GetClothesFilterDto): Product[] {
    let products = this.getAllProducts();

    if (filterDto instanceof GetClothesFilterDto) {
      const { size, search } = filterDto;

      if (size)
        products = products.filter((clothes: Clothes) => clothes.size === size);
      if (search)
        products = products.filter((clothes: Clothes) => clothes.title.includes(search) || clothes.description.includes(search));
    } else if (filterDto instanceof GetProductFilterDto) {
      const { search } = filterDto;

      if (search)
        products = products.filter((product: Product) => product.title.includes(search) || product.description.includes(search));
    }

    return products
  }

  getProductById(id: string): Product {
    return this.products.find((product) => product.id = id);
  }

  createProduct(createProductDto: CreateProductDto | CreateClothesDto): Product | Clothes {
    const product = {
      id: uuid(),
      ...createProductDto
    };
    this.products.push(product);
    return product;
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((product) => product.id != id);
  }

  updateProductPrice(id: string, price: Price): Product {
    const product = this.getProductById(id);
    product.price = price;
    return product
  }
}
