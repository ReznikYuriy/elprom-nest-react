import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserModule } from '../user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import configs from '../../../configs';
import UserModel from '../model/user.schema';
import CreateUserDto from '../dto/create.user.dto';
import { RolesEnum } from '../enums/user.role';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  const testAdmin: CreateUserDto = {
    email: 'test@email.com',
    name: 'testAdmin',
    password: '12345',
    role: RolesEnum.ADMIN,
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        UserModule,
        SequelizeModule.forRoot({
          ...configs.postgres,
          database: 'unit_test',
          dialect: 'postgres',
          autoLoadModels: true,
          synchronize: true,
          models: [UserModel],
        }),
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await UserModel.truncate();
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('admin create and find tests', async () => {
    const admin = await service.createUser(testAdmin);
    expect(admin.email).toEqual(testAdmin.email);
    expect(admin.name).toEqual(testAdmin.name);
    expect(admin.role).toEqual(testAdmin.role);
    expect(admin.password).not.toEqual(testAdmin.password);

    const allAdmins = await service.findAllAdmins();
    const currAdmin = allAdmins.find((el) => el.id === admin.id);
    expect(currAdmin).toBeDefined();

    const emailAdmin = await service.findOneByEmail(testAdmin.email);
    expect(emailAdmin.id).toEqual(admin.id);
  });
});
