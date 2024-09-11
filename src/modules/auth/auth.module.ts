import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigService } from '@shared/infra/env-config/env-config.service';
import { EnvConfigModule } from '@shared/infra/env-config/env-config.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvConfigModule.forRoot()],
      inject: [EnvConfigService],
      useFactory: (config: EnvConfigService) => ({
        secret: config.get('jwt').secret,
        signOptions: {
          expiresIn: config.get('jwt').expiresIn,
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
