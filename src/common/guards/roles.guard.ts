import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../utils/enums';
import { CURRENT_USER_KEY } from '../utils/constants';
import { JWTPayloadTypes } from '../utils/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user: JWTPayloadTypes = request[CURRENT_USER_KEY] as JWTPayloadTypes;
    console.log('User in RolesGuard:', user);
    if (!user) {
      throw new ForbiddenException('Access denied, no user found');
    }
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    console.log('Required Roles:', requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException(
        'Access denied, insufficient permissions @payload',
      );
    }

    return true;
  }
}
