import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import UsersRepository from './repositories/users.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  //controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository],
})
export class UserModule {}
