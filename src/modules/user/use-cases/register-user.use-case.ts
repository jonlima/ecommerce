import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository.interface';
import { User } from '../entities/user.entity';
import { EmailService } from '@shared/infra/email/email.service';
import { EnvConfigService } from '@shared/infra/env-config/env-config.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,
    private readonly emailService: EmailService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const emailExists = await this.repository.findByEmail(createUserDto.email);

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const newUser = new User(createUserDto);
    const user = await this.repository.save(newUser);

    await this.emailService.sendConfirmEmail({
      to: user.email,
      name: user.name,
      title: 'Confirmação de E-mail',
      link: this.generateLink(user.id),
    });

    return user;
  }

  private generateLink(id: string): string {
    const host = this.envConfigService.get('host');
    const port = this.envConfigService.get('port');
    return `${host}:${port}/user/confirm/${id}`;
  }
}
