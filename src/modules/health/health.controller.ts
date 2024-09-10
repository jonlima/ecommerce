import { Controller, Get } from '@nestjs/common';
import { GetHealthStatusUseCase } from './use-cases/get-health-status.use-case';
import { HealthStatusDto } from './dto/health-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly getHealthStatusUseCase: GetHealthStatusUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get the current health status of the application' })
  @ApiResponse({ type: HealthStatusDto })
  getHealthStatus(): HealthStatusDto {
    return this.getHealthStatusUseCase.execute();
  }
}
