import { Injectable } from '@nestjs/common';
import { User } from 'src/user/model/user.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new UserEntity(createUserDto);
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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
