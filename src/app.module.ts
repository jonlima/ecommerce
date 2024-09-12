import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { TypeormPersistenceModule } from './shared/infra/persistence/typeorm/typeorm-persistence.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@shared/core/guards/jwt-auth/jwt-auth.guard';
import { EmailModule } from './shared/infra/email/email.module';

@Module({
  imports: [
    HealthModule,
    EnvConfigModule.forRoot(),
    TypeormPersistenceModule,
    UserModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
