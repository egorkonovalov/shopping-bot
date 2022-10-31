import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { Price } from './product.model';
import { ProductsService } from './services/products.service';
import { Product, ProductWithAttributes } from './entities/product.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductType } from './entities/product-type.entity';
import { ProductTypeService } from './services/product-type.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private productTypeService: ProductTypeService) { };

  @Get()
  async getProducts(@Query() filterDto: GetProductsFilterDto): Promise<ProductWithAttributes[]> {
    return this.productsService.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Post('/product_type')
  createProductType(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    return this.productTypeService.createProductType(createProductTypeDto)
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }

  @Patch('/:id/price')
  updateProductPrice(
    @Param('id') id: string,
    @Body() price: Price): Promise<Product> {
    return this.productsService.updateProductPrice(id, price);
  }
}
