import { UserModel } from '../model/user.model';

export class UserResponseDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(userData: UserModel) {
    this.id = userData.id;
    this.login = userData.login;
    this.version = userData.version;
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }
}
