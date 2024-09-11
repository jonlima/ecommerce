import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from '@shared/core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
