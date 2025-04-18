import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.service'; 

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by username', async () => {
    const result = await service.findOne('admin');
    expect(result).toEqual({
      userId: 3,
      username: 'admin',
      password: 'admin',
    });
  });

  it('should return undefined if user not found', async () => {
    const result = await service.findOne('nonexistentuser');
    expect(result).toBeUndefined();
  });
});
