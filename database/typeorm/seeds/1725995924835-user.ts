import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { v4 as uuid_generate_v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from '../../../src/modules/user/entities/user.entity';
import { RoleEnum } from '../../../src/shared/core/enums/role.enum';

export class User1725995924835 implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const hashPassword = bcrypt.hashSync('loomi2024', 10);
    const adminUser = userRepo.create({
      id: uuid_generate_v4(),
      name: 'Admin',
      email: 'admin@test.com',
      password: hashPassword,
      role: RoleEnum.ADMIN,
      enabled: true,
      email_confirmed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    await userRepo.save(adminUser);

    console.log('Seed de usuários executado');
  }
}
