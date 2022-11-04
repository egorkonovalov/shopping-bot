import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { ShopUser } from './entities/shop-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './auth.repository';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([ShopUser]),
  ],
  providers: [AuthService, UsersRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
