import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository.interface';

@Injectable()
export class ConfirmEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findEmailNotConfirmed(id);

    if (!user) {
      throw new NotFoundException(`E-mail invalid`);
    }

    user.email_confirmed_at = new Date();
    await this.userRepository.save(user);

    return { message: 'E-mail confirmed' };
  }
}
