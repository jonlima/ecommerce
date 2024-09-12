import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '@shared/infra/email/email.service';
import { EnvConfigService } from '@shared/infra/env-config/env-config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly envConfigService: EnvConfigService,
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

      const user = await this.userRepository.save(newUser);

      this.emailService.sendConfirmEmail({
        to: user.email,
        name: user.name,
        title: 'Confirmação de E-mail',
        link: this.generateLink(user.id),
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async confirmEmail(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
          enabled: true,
          deleted_at: IsNull(),
          email_confirmed_at: IsNull(),
        },
      });

      if (!user) {
        throw new NotFoundException(`E-mail invalid`);
      }

      user.email_confirmed_at = new Date();
      await this.userRepository.save(user);

      return { message: 'E-mail confirmed' };
    } catch (error) {
      throw error;
    }
  }

  generateLink(id: string) {
    const host = this.envConfigService.get('host');
    const port = this.envConfigService.get('port');

    return `${host}:${port}/user/confirm/${id}`;
  }
}
