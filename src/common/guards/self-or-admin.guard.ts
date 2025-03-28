import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CURRENT_USER_KEY } from '../utils/constants';
import { JWTPayloadTypes } from '../utils/types';
import { UserRole } from '../utils/enums';
import { Request } from 'express';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const userPayload = request[CURRENT_USER_KEY] as JWTPayloadTypes;
    const paramId = request.params.id;

    const isAdmin = userPayload.role === UserRole.ADMIN;
    const isSelf = userPayload.id === paramId;

    if (!isAdmin && !isSelf) {
      throw new ForbiddenException(
        'Access denied. You can only access your own data.',
      );
    }
    return true;
  }
}
