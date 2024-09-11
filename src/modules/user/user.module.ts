import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeormPersistenceModule } from 'src/shared/infra/persistence/typeorm/typeorm-persistence.module';

@Module({
  imports: [TypeormPersistenceModule],
  controllers: [UserController],
})
export class UserModule {}
