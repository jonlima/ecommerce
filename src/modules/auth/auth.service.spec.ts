import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { FindOneByEmailUseCase } from '@modules/user/use-cases/find-one-by-email.use-case';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '@modules/user/entities/user.entity';
import { RoleEnum } from '@shared/core/enums/role.enum';
import { USER_REPOSITORY } from '@modules/user/repositories/user-repository.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let findOneByEmailUseCase: Partial<FindOneByEmailUseCase>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: FindOneByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: USER_REPOSITORY,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    findOneByEmailUseCase = module.get<FindOneByEmailUseCase>(
      FindOneByEmailUseCase,
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve fazer login com sucesso e retornar um token JWT', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: '123456',
    };
    const userMock: User = {
      id: '1',
      email: 'test@example.com',
      password: bcrypt.hashSync('123456', 10),
      role: RoleEnum.CUSTOMER,
      name: 'Test User',
      created_at: new Date(),
      updated_at: new Date(),
      enabled: true,
      encryptPassword: jest.fn(),
    };

    jest.spyOn(findOneByEmailUseCase, 'execute').mockResolvedValue(userMock);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    jest.spyOn(jwtService, 'sign').mockReturnValue('jwt_token');

    const result = await authService.login(loginDto);

    expect(findOneByEmailUseCase.execute).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: userMock.id,
      role: userMock.role,
      name: userMock.name,
    });
    expect(result).toEqual({ access_token: 'jwt_token' });
  });

  it('deve lançar UnauthorizedException se as credenciais forem inválidas', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    jest.spyOn(findOneByEmailUseCase, 'execute').mockResolvedValue(null);

    await expect(authService.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve lançar UnauthorizedException se a senha estiver errada', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };
    const userMock: User = {
      id: '1',
      email: 'test@example.com',
      password: bcrypt.hashSync('123456', 10),
      role: RoleEnum.CUSTOMER,
      name: 'Test User',
      created_at: new Date(),
      updated_at: new Date(),
      enabled: true,
      encryptPassword: jest.fn(),
    };

    jest.spyOn(findOneByEmailUseCase, 'execute').mockResolvedValue(userMock);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    await expect(authService.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
