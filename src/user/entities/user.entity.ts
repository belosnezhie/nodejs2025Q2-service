import { randomUUID } from 'crypto';
import { User } from '../model/user.model';

export class UserEntity implements User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Pick<User, 'login' | 'password'>) {
    const now = Date.now();
    this.id = randomUUID();
    this.login = partial.login;
    this.password = partial.password;
    this.version = 1;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
