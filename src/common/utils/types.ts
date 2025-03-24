import { UserRole } from './enums';

export type JWTPayloadTypes = {
  id: string;
  email: string;
  role: UserRole;
};

export type AccessTokentype = {
  accessToken: string;
};
