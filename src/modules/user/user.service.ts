import { Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
        enabled: true,
        deleted_at: IsNull(),
        email_confirmed_at: Not(IsNull()),
      },
    });
  }
}
