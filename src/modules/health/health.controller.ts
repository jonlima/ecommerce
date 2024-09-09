import { Controller, Get } from '@nestjs/common';
import { GetHealthStatusUseCase } from './use-cases/get-health-status.use-case';
import { HealthStatusDto } from './dto/health-status.dto';

@Controller('health')
export class HealthController {
  constructor(
    private readonly getHealthStatusUseCase: GetHealthStatusUseCase,
  ) {}

  @Get()
  getHealthStatus(): HealthStatusDto {
    return this.getHealthStatusUseCase.execute();
  }
}
