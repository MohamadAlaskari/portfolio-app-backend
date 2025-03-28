import { ForbiddenException } from '@nestjs/common/exceptions';
import { UserRole } from './enums';

export function assertSelfOrAdmin(
  userId: string,
  payloadId: string,
  role: UserRole,
): void {
  const isAdmin = role === UserRole.ADMIN;
  const isSelf = userId === payloadId;

  if (!isAdmin && !isSelf) {
    throw new ForbiddenException(
      'Access denied. You can only access your own profile.',
    );
  }
}
