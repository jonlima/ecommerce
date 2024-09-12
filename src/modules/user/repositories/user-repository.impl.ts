import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user-repository.interface';
import { User } from '../entities/user.entity';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, enabled: true, deleted_at: IsNull() },
    });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
        enabled: true,
        deleted_at: IsNull(),
        email_confirmed_at: Not(IsNull()),
      },
    });
  }

  async findEmailNotConfirmed(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
        enabled: true,
        deleted_at: IsNull(),
        email_confirmed_at: IsNull(),
      },
    });
  }
}
