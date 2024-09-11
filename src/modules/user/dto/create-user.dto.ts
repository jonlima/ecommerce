import { RoleEnum } from '@shared/core/enums/role.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: RoleEnum;
}
