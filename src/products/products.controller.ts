import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { Price } from './product.model';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { };

  @Get()
  getProducts(@Query() filterDto: GetProductFilterDto): Promise<Product[]> {
    if (Object.keys(filterDto).length)
      return this.productsService.getProductsWithFilters(filterDto);
    else
      return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
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
