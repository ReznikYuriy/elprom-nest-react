import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesEnum } from '../enums/user.role';
import User from '../model/user.schema';
import CreateUserDto from '../dto/create.user.dto';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User) private readonly userSchema: typeof User) {}

  async findById(id: number): Promise<User> {
    return await this.userSchema.findOne({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userSchema.create(data);
    return user;
  }

  async findAllAdmins(): Promise<User[]> {
    return this.userSchema.findAll({
      where: { role: RolesEnum.ADMIN },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userSchema.findOne({
      where: { email },
    });
  }
}
