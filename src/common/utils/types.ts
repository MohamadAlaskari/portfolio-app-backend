import { UserRole } from './enums';

export type JWTPayloadTypes = {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified?: boolean;
};

export type AccessTokentype = {
  accessToken: string;
};

export type MailOptions = {
  to: string;
  subject: string;
  html: string;
};
