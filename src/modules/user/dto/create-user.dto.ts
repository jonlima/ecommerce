import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@shared/core/enums/role.enum';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Admin user',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'test@test.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User password, must be at least 6 characters long',
    example: 'strongPass123',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: RoleEnum,
    example: RoleEnum.CUSTOMER,
    required: false,
    default: RoleEnum.CUSTOMER,
  })
  @IsOptional()
  role?: RoleEnum;
}
