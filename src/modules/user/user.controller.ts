import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '@shared/core/guards/roles/roles.guard';
import { Roles } from '@shared/core/decorators/roles.decorator';
import { RoleEnum } from '@shared/core/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('access_token')
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(RoleEnum.ADMIN)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user (Admin only)' })
  @ApiBody({ type: CreateUserDto, description: 'User registration data' })
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }
}
