import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './register-user.use-case';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../repositories/user-repository.interface';
import { ConflictException } from '@nestjs/common';
import { EmailService } from '@shared/infra/email/email.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { EnvConfigService } from '@shared/infra/env-config/env-config.service';
import { User } from '../entities/user.entity';
import { RoleEnum } from '@shared/core/enums/role.enum';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let userRepository: Partial<UserRepository>;
  let emailService: Partial<EmailService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendConfirmEmail: jest.fn(),
          },
        },
        {
          provide: EnvConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000'),
          },
        },
      ],
    }).compile();

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    userRepository = module.get<UserRepository>(USER_REPOSITORY);
    emailService = module.get<EmailService>(EmailService);
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: '123456',
      name: 'Test',
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test',
      password: 'hashed_password',
      role: RoleEnum.CUSTOMER,
      created_at: new Date(),
      updated_at: new Date(),
      enabled: true,
      email_confirmed_at: null,
      encryptPassword: jest.fn(),
    } as User);

    await registerUserUseCase.execute(createUserDto);

    expect(userRepository.save).toHaveBeenCalled();
    expect(emailService.sendConfirmEmail).toHaveBeenCalled();
  });

  it('deve lançar erro se o e-mail já estiver cadastrado', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: '123456',
      name: 'Test',
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test',
      password: 'hashed_password',
      role: RoleEnum.CUSTOMER,
      created_at: new Date(),
      updated_at: new Date(),
      enabled: true,
      email_confirmed_at: null,
      encryptPassword: jest.fn(),
    });

    await expect(registerUserUseCase.execute(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
