import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '@shared/infra/email/email.module';
import { EnvConfigModule } from '@shared/infra/env-config/env-config.module';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { ConfirmEmailUseCase } from './use-cases/confirm-email.use-case';
import { FindOneByEmailUseCase } from './use-cases/find-one-by-email.use-case';
import { UserRepositoryImpl } from './repositories/user-repository.impl';
import { USER_REPOSITORY } from './repositories/user-repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailModule,
    EnvConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    ConfirmEmailUseCase,
    FindOneByEmailUseCase,
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
  ],
  exports: [FindOneByEmailUseCase],
})
export class UserModule {}
