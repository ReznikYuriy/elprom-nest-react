import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../services/user.service';
import UserModel from '../model/user.schema';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { UserModule } from '../user.module';
import UsersRepository from '../repositories/users.repository';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const mockRepository = {
      find() {
        return {};
      },
    };
    /* const module = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getModelToken(UserModel))
      .useValue(mockRepository)
      .compile();
    controller = module.get<UserController>(UserController); */
    //deviceService = module.get<DeviceService>(DeviceService);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UsersRepository,
          useValue: { signup: () => null, signin: () => null },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
