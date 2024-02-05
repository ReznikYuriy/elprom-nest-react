import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import configs from 'src/configs';
import UserModel from 'src/modules/user/model/user.schema';
import UsersRepository from 'src/modules/user/repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET || configs.jwt.secret,
    });
  }

  async validate(payload: any): Promise<UserModel | null> {
    const { email } = payload;

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
