import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FindOneByEmailUseCase } from '@modules/user/use-cases/find-one-by-email.use-case';

@Injectable()
export class AuthService {
  constructor(
    private findOneByEmailUseCase: FindOneByEmailUseCase,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.findOneByEmailUseCase.execute(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      role: user.role,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
