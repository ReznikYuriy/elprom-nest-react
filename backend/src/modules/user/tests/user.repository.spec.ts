import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import UsersRepository from '../repositories/users.repository';
import { UserController } from '../user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from '../model/user.schema';
import configs from '../../../configs';
import { UserModule } from '../user.module';
import CreateUserDto from '../dto/create.user.dto';
import { RolesEnum } from '../enums/user.role';

describe('UserRepository', () => {
  let repo: UsersRepository;
  let module: TestingModule;

  beforeEach(async () => {
    /* const mockRepository = {
      find() {
        return {};
      },
    }; */
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
      //controllers: [UserController],
      //providers: [
      //UserService,
      //UsersRepository,
      /* {
          provide: UsersRepository,
          useValue: { signup: () => null, signin: () => null },
        }, */
      //],
    }).compile();

    repo = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(async () => {
    // Clean up resources, if necessary
    await module.close();
  });

  it('should be defined', async () => {
    expect(repo).toBeDefined();
  });
});
