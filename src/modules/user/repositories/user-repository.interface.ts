export const USER_REPOSITORY = Symbol('UserRepository');

import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findEmailNotConfirmed(id: string): Promise<User | null>;
}
