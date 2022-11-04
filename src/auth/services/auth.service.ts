import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../auth.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) { }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("Wrong username or/and password");
    }
  }
}
