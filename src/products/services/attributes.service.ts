import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Attribute } from "../entities/attribute.entity";
import { Product, Product as ProductEntity } from "../entities/product.entity";
import { Product as IProduct } from "../product.model";

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributesRepository: Repository<Attribute>
  ) { }

  async createAttribute(attributes: IProduct['attributes'], product: ProductEntity): Promise<void> {
    for (let attribute of attributes) {
      const result = this.attributesRepository.create({
        id: uuid(),
        product: product,
        name: attribute.name,
        value: attribute.value
      })
      await this.attributesRepository.save(result);
    }
  }

  async getAttributesByProduct(product: Product): Promise<Attribute[]> {
    return await this.attributesRepository.findBy({ product: product })
  }
}
