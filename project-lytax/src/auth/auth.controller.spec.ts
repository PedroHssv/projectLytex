import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    getProfile: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a token when valid credentials are provided', async () => {
      const signInDto: SignInDto = { username: 'admin', password: 'admin' };
      const mockToken = { access_token: 'mocked-jwt-token' };

      mockAuthService.signIn.mockResolvedValue(mockToken);

      const result = await controller.signIn(signInDto);

      expect(result).toEqual(mockToken);
      expect(mockAuthService.signIn).toHaveBeenCalledWith('admin', 'admin');
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const signInDto: SignInDto = { username: 'admin', password: 'wrongpassword' };

      mockAuthService.signIn.mockRejectedValue(new UnauthorizedException());

      await expect(controller.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return the user profile if authenticated', async () => {
      const mockUser = { userId: 3, username: 'admin' };
      const req = { user: mockUser };

      const result = await controller.getProfile(req);

      expect(result).toEqual(mockUser);
    });
  });
});
