import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../utils/enums';
import { CURRENT_USER_KEY } from '../utils/constants';
import { JWTPayloadTypes } from '../utils/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const user: JWTPayloadTypes = request[CURRENT_USER_KEY] as JWTPayloadTypes;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied, insufficient permissions');
    }

    return true;
  }
}
