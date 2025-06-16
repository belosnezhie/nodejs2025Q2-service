import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(userData: User) {
    this.id = userData.id;
    this.login = userData.login;
    this.version = userData.version;
    this.createdAt = Number(userData.createdAt);
    this.updatedAt = Number(userData.updatedAt);
  }
}
