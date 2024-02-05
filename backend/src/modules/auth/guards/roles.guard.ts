import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/modules/user/enums/user.role';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
