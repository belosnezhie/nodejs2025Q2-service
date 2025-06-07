import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserModel } from 'src/routes/user/model/user.model';
import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/routes/user/dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private users: UserModel[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const user: UserModel = {
      version: 1,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<UserModel[]> {
    return this.users;
  }

  async findOne(id: string): Promise<UserModel | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const user = await this.findOne(id);

    user.password = updateUserDto.newPassword;
    user.version = user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users.splice(userIndex, 1);
  }
}
