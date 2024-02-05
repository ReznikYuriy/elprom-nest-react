import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesEnum } from '../enums/user.role';
import UserModel from '../model/user.schema';
import CreateUserDto from '../dto/create.user.dto';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(UserModel) private readonly userSchema: typeof UserModel,
  ) {}

  async findById(id: number): Promise<UserModel> {
    return await this.userSchema.findOne({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    const user = await this.userSchema.create(data);
    return user;
  }

  async findAllAdmins(): Promise<UserModel[]> {
    return this.userSchema.findAll({
      where: { role: RolesEnum.ADMIN },
    });
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return this.userSchema.findOne({
      where: { email },
    });
  }
}
