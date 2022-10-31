import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributesService } from './services/attributes.service';
import { ProductType } from './entities/product-type.entity';
import { ProductTypeService } from './services/product-type.service';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Attribute, ProductType])],
  controllers: [ProductsController],
  providers: [ProductsService, AttributesService, ProductTypeService, ProductsRepository],
})
export class ProductsModule { }
