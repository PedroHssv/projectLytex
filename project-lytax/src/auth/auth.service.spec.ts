import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token when valid credentials are provided', async () => {
    const mockUser = { userId: 1, username: 'john', password: 'changeme' };
    const mockToken = 'mocked-jwt-token';

    mockUsersService.findOne.mockResolvedValue(mockUser);
    mockJwtService.signAsync.mockResolvedValue(mockToken);

    const result = await service.signIn('john', 'changeme');
    
    expect(result).toEqual({ access_token: mockToken });
    expect(mockUsersService.findOne).toHaveBeenCalledWith('john');
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: mockUser.userId,
      username: mockUser.username,
    });
  });

  it('should throw UnauthorizedException when invalid credentials are provided', async () => {
    const mockUser = { userId: 1, username: 'john', password: 'changeme' };

    mockUsersService.findOne.mockResolvedValue(mockUser);

    await expect(service.signIn('john', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    mockUsersService.findOne.mockResolvedValue(undefined);

    await expect(service.signIn('nonexistent', 'any')).rejects.toThrow(UnauthorizedException);
  });
});
