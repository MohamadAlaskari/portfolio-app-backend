import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/common/utils/enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
