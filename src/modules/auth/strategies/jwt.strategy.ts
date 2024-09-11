import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvConfigService } from '@shared/infra/env-config/env-config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private envService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('jwt').secret,
    });
  }

  async validate(payload) {
    return {
      userId: payload.sub,
      name: payload.name,
      role: payload.role,
    };
  }
}
