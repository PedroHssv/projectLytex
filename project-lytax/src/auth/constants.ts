import { ConfigService } from '@nestjs/config';
import { SetMetadata } from '@nestjs/common';

const configService = new ConfigService();

export const jwtConstants = {
  secret: configService.get<string>('JWT_SECRET'),
  expire: configService.get<string>('JWT_EXPIRE')
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);