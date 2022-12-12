import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductType } from "../entities/product-type.entity";
import { CreateProductTypeDto } from "../dto/create-product-type.dto";

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>
  ) { }

  async createProductType(createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    const productType = this.productTypeRepository.create(createProductTypeDto)
    await this.productTypeRepository.save(productType)
    return productType
  }
}
