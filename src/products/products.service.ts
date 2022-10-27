import { Inject, Injectable } from '@nestjs/common';
import type { Price } from './product.model';
import { v4 as uuid } from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) { }

  async getAllProducts(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getProductsWithFilters(filterDto: GetProductFilterDto): Promise<Product[]> {
    let products = await this.getAllProducts();
    const { search } = filterDto;
    if (search)
      products = products.filter((product: Product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
        || product.description.toLowerCase().includes(search.toLowerCase()));
    return products
  }

  async getProductById(id: string): Promise<Product> {
    try {
      return await this.productsRepository.findOneByOrFail({ id: id });
    } catch (e) {
      throw new NotFoundException(e.message)
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      id: uuid(),
      ...createProductDto
    });

    await this.productsRepository.save(product);
    return product
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} were not found`);
    }
  }

  async updateProductPrice(id: string, price: Price): Promise<Product> {
    const product = await this.getProductById(id);
    product.price = price;
    await this.productsRepository.save(product )
    return product
  }
}
