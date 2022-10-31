import type { Price } from '../product.model';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Product, ProductWithAttributes } from '../entities/product.entity';
import { AttributesService } from './attributes.service';
import { ProductsRepository } from "../products.repository"


@Injectable()
export class ProductsService {

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly attributeService: AttributesService
  ) { }

  async getProductWithAttributes(product: Product): Promise<ProductWithAttributes> {
    return {
      ...product,
      attributes: await this.attributeService.getAttributesByProduct(product)
    }
  }

  async getProducts(filterDto: GetProductsFilterDto): Promise<ProductWithAttributes[]> {
    const result = await this.productsRepository.getProducts(filterDto);
    return await Promise.all(
      result.map(product => this.getProductWithAttributes(product))
    )
  }

  async getProductById(id: string): Promise<ProductWithAttributes> {
    try {
      const product = await this.productsRepository.findOneByOrFail({ id: id });
      return this.getProductWithAttributes(product);
    } catch (e) {
      throw new NotFoundException(e.message)
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductWithAttributes> {
    const product = await this.productsRepository.createProduct(createProductDto)
    const attributes = await this.attributeService.createAttribute(createProductDto['attributes'], product);
    return { ...product, attributes: attributes }
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
    await this.productsRepository.save(product)
    return product
  }
}
