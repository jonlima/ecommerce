import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@shared/core/guards/roles/roles.guard';
import { Roles } from '@shared/core/decorators/roles.decorator';
import { RoleEnum } from '@shared/core/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/core/decorators/public.decorator';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { ConfirmEmailUseCase } from './use-cases/confirm-email.use-case';
import { FindOneByEmailUseCase } from './use-cases/find-one-by-email.use-case';

@ApiTags('Users')
@ApiBearerAuth('access_token')
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
    private readonly findOneByEmailUseCase: FindOneByEmailUseCase,
  ) {}

  @Roles(RoleEnum.ADMIN)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user (Admin only)' })
  @ApiBody({ type: CreateUserDto, description: 'User registration data' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.registerUserUseCase.execute(createUserDto);
  }

  @Public()
  @Get('confirm/:id')
  @ApiOperation({ summary: 'Confirm email' })
  confirmEmail(@Param('id') id: string) {
    return this.confirmEmailUseCase.execute(id);
  }
}
