import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { EnvConfigModule } from 'src/shared/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/shared/infra/env-config/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (config: EnvConfigService) => {
        return {
          type: 'postgres',
          logging: false,
          autoLoadEntities: false,
          synchronize: false,
          migrationsTableName: 'typeorm_migrations',
          ...config.get('database'),
          entities: [User],
        };
      },
    }),
  ],
})
export class TypeormPersistenceModule {}
