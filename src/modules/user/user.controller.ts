import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('register')
  register() {}
}
