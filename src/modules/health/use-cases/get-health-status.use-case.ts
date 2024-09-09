import { HttpStatus, Injectable } from '@nestjs/common';
import { HealthStatusDto } from '../dto/health-status.dto';

@Injectable()
export class GetHealthStatusUseCase {
  execute(): HealthStatusDto {
    return { message: 'Ok', statusCode: HttpStatus.OK };
  }
}
