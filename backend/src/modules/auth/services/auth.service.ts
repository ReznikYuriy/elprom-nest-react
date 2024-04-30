import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import configs from '../../../configs';
import UserModel from '../../../modules/user/model/user.schema';
import { UserService } from '../../../modules/user/services/user.service';
import { RolesEnum } from 'src/modules/user/enums/user.role';

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

  handlerLogin() {
    return 'handlerLogin';
  }

  async googleLogin(user: UserModel) {
    let dbUser = await this.usersService.findOneByEmail(user?.email);
    if (!dbUser) {
      dbUser = await this.usersService.createUser({
        name: user?.name,
        email: user?.email,
        password: 'default_password',
        role: RolesEnum.USER,
      });
    }
    const payload = {
      name: dbUser?.name,
      email: dbUser?.email,
    };
    return this.jwtService.sign(payload, configs.jwt);
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
