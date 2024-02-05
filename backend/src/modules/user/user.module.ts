import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import UsersRepository from './repositories/users.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import User from './model/user.schema';

@Module({
  //controllers: [UserController],
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository],
})
export class UserModule {}
