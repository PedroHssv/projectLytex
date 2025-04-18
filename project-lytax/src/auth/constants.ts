import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: '40028922',
  expire: '6000s'
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);