import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import { UserEntity } from './entities/user.entity';
import { validateNotFound } from 'src/common/validate-not-found';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user = new UserEntity(createUserDto);
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    return validateNotFound(user, 'User not found.');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    user.password = updateUserDto.newPassword;
    user.version = user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(userIndex, 1);
  }
}
