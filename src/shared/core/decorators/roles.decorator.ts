import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/role.enum';

export const Roles = (...args: RoleEnum[]) => SetMetadata('roles', args);
