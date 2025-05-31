import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import { UserEntity } from './entities/user.entity';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = new UserEntity(createUserDto);
    this.users.push(user);
    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const res = [];
    this.users.forEach((user) => {
      res.push(new UserResponseDto(user));
    });
    return res;
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return new UserResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong.');
    }

    user.password = updateUserDto.newPassword;
    user.version = user.version += 1;
    user.updatedAt = Date.now();
    return new UserResponseDto(user);
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(userIndex, 1);
  }
}
