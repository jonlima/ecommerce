import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { factory } from './env-config.factory';
import { EnvConfigService } from './env-config.service';

export class EnvConfigModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          expandVariables: true,
          load: options?.load ? [factory, ...options.load] : [factory],
        }),
      ],
      providers: [EnvConfigService],
      exports: [EnvConfigService],
    };
  }
}
