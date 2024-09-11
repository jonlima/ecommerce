import { ConflictException, Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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

  async register(createUserDto: CreateUserDto) {
    try {
      const emailExists = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
          enabled: true,
          deleted_at: IsNull(),
        },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      const newUser = new User(createUserDto);

      return this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }
}
