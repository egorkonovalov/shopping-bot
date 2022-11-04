import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ShopUser } from "./entities/shop-user.entity";

@Injectable()
export class UsersRepository extends Repository<ShopUser> {
  constructor(private dataSource: DataSource) {
    super(ShopUser, dataSource.createEntityManager());
  }
}
