import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';

@Module({
  imports: [HealthModule, EnvConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
