import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { TypeormPersistenceModule } from './shared/infra/persistence/typeorm/typeorm-persistence.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    HealthModule,
    EnvConfigModule.forRoot(),
    TypeormPersistenceModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
