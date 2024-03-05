import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthModule } from '../auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import configs from '../../../configs';
import UserModel from '../../user/model/user.schema';
import { RolesEnum } from '../../user/enums/user.role';
import CreateUserDto from '../../user/dto/create.user.dto';
import { UserService } from '../../../modules/user/services/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let module: TestingModule;

  const testUser: CreateUserDto = {
    email: 'test@email.com',
    name: 'testAdmin',
    password: '12345',
    role: RolesEnum.USER,
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        AuthModule,
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

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await UserModel.truncate();
    await module.close();
  });

  it('login test', async () => {
    const user = await userService.createUser(testUser);
    const loginResult = await authService.login(user);
    expect(loginResult?.accessToken).toBeDefined();
    expect(loginResult?.isAuthorized).toBeTruthy();
  });

  it('validate test', async () => {
    const user = await userService.createUser(testUser);

    const validateResult = await authService.validateUser(
      testUser.email,
      testUser.password,
    );
    expect(validateResult).toBeDefined();
    expect(validateResult).toBeInstanceOf(UserModel);
    const validateWithInvalidPass = await authService.validateUser(
      testUser.email,
      'invalid_password',
    );
    expect(validateWithInvalidPass).toBeNull();
    const validateWithInvalidEmail = await authService.validateUser(
      'invalid@mail.com',
      testUser.password,
    );
    expect(validateWithInvalidEmail).toBeNull();
  });
});
