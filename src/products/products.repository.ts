import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere(
        'LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
        { search: `%${search}%` }
      )
    }

    const products = await query.getMany();
    return products
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.create({
      id: uuid(),
      ...createProductDto
    });
    await this.save(product);
    return product
  }
}
