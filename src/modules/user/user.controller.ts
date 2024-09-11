import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '@shared/core/guards/roles/roles.guard';
import { Roles } from '@shared/core/decorators/roles.decorator';
import { RoleEnum } from '@shared/core/enums/role.enum';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(RoleEnum.ADMIN)
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }
}
