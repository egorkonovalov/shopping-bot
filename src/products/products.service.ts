import { Injectable } from '@nestjs/common';
import type { Price, Product } from './product.model';
import { v4 as uuid } from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductsWithFilters(filterDto: GetProductFilterDto): Product[] {
    let products = this.getAllProducts();
    const { search } = filterDto;
    if (search)
      products = products.filter((product: Product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
        || product.description.toLowerCase().includes(search.toLowerCase()));
    return products
  }

  getProductById(id: string): Product {
    const found = this.products.find((product) => product.id = id);

    if (!found) {
      throw new NotFoundException();
    }

    return found
  }

  createProduct(createProductDto: CreateProductDto): Product {
    const product = {
      id: uuid(),
      ...createProductDto
    };
    this.products.push(product);
    return product;
  }

  deleteProduct(id: string): void {
    const found = this.getProductById(id);
    this.products = this.products.filter((product) => product.id != found.id);
  }

  updateProductPrice(id: string, price: Price): Product {
    const product = this.getProductById(id);
    product.price = price;
    return product
  }
}
