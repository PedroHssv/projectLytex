import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const jwtConstants = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  expire: configService.get<string>('JWT_EXPIRE'),
});

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);