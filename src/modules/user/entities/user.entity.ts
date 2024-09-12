import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { RoleEnum } from '../../../shared/core/enums/role.enum';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

import * as bcrypt from 'bcrypt';

const NUMBER_OF_ROUNDS = 10;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'b142c4d6-43b8-11ec-81d3-0242ac130003',
  })
  id: string;

  @Column()
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Hashed password of the user',
    example: 'hashed_password_here',
  })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum })
  @ApiProperty({
    enum: RoleEnum,
    description: 'Role of the user',
    example: RoleEnum.CUSTOMER,
  })
  role: RoleEnum;

  @Column({ default: true })
  @ApiProperty({
    description: 'Indicates if the user account is enabled',
    example: true,
  })
  enabled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'Timestamp of email confirmation',
    example: '2024-02-01T10:00:00Z',
    nullable: true,
  })
  email_confirmed_at?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Creation date of the user',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Last update date of the user',
    example: '2024-01-05T08:00:00Z',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'Timestamp for soft delete',
    nullable: true,
    example: '2024-02-01T10:00:00Z',
  })
  deleted_at?: Date;

  constructor(props: CreateUserDto) {
    const encryptPassword = this.encryptPassword(props?.password);

    if (!props?.role) {
      this.role = RoleEnum.CUSTOMER;
    }

    Object.assign(this, props, { password: encryptPassword });
  }

  encryptPassword(passwordPlain: string = '') {
    return bcrypt.hashSync(passwordPlain, NUMBER_OF_ROUNDS);
  }
}
