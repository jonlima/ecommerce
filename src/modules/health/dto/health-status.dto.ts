import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusDto {
  @ApiProperty({
    example: 200,
    description: 'Status code. Use HttpStatus from @nestjs/common',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Ok',
    description: 'Health status message',
  })
  message: string;
}
