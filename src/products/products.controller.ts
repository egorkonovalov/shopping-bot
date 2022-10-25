import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { Price, Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { };

  @Get()
  getProducts(@Query() filterDto: GetProductFilterDto): Product[] {
    if (Object.keys(filterDto).length)
      return this.productsService.getProductsWithFilters(filterDto);
    else
      return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Product {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): void {
    return this.productsService.deleteProduct(id);
  }

  @Patch('/:id/price')
  updateProductPrice(
    @Param('id') id: string,
    @Body() price: Price): Product {
    return this.productsService.updateProductPrice(id, price);
  }
}
