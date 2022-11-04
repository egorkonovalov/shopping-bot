import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./auth.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { ShopUser } from "./entities/shop-user.entity"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user: ShopUser = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException()
    }
    return user;
  }
}
