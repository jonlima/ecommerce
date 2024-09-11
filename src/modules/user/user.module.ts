import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
// import { TypeormPersistenceModule } from 'src/shared/infra/persistence/typeorm/typeorm-persistence.module';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
