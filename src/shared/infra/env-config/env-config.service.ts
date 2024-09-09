import { Injectable } from '@nestjs/common';
import { ConfigService, Path, PathValue } from '@nestjs/config';
import { EnvConfig } from './env-config.type';

@Injectable()
export class EnvConfigService<C = EnvConfig> extends ConfigService<C, true> {
  override get<P extends Path<C>>(propertyPath: P): PathValue<C, P> {
    return super.get(propertyPath, { infer: true });
  }
}
