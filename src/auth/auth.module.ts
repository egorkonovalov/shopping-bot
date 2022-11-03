import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersRepository],
  controllers: [AuthController]
})
export class AuthModule { }
