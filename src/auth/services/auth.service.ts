import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../auth.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException();
    }
  }
}
