import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import UsersRepository from '../repositories/users.repository';
import { UserController } from '../user.controller';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mockRepository = {
      find() {
        return {};
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UsersRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
