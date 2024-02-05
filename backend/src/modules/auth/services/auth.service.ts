import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import configs from 'src/configs';
import UserModel from 'src/modules/user/model/user.schema';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserModel) {
    const payload = {
      name: user.name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, configs.jwt);
    return {
      isAuthorized: true,
      accessToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const checker = await compare(password, user.password);

    if (!checker) {
      return null;
    }

    return user;
  }
}
