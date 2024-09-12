import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '@shared/infra/email/email.module';
import { EnvConfigModule } from '@shared/infra/env-config/env-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailModule,
    EnvConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
