import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { GetHealthStatusUseCase } from './use-cases/get-health-status.use-case';

@Module({
  controllers: [HealthController],
  providers: [GetHealthStatusUseCase],
})
export class HealthModule {}
