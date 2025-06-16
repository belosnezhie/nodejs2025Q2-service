import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const encodedPassword = await hash(createUserDto.password, 10);

    const user = {
      version: 1,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      login: createUserDto.login,
      password: encodedPassword,
    };
    const createdUser = await this.usersRepo.save(user);
    return new UserResponseDto(createdUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const res = [];
    const users = await this.usersRepo.find();
    users.forEach((user) => {
      res.push(new UserResponseDto(user));
    });
    return res;
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return new UserResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isValidPassword = await compare(
      user.password,
      updateUserDto.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('OldPassword is wrong.');
    }

    const encodedPassword = await hash(updateUserDto.password, 10);

    user.password = encodedPassword;
    user.version = user.version += 1;
    user.updatedAt = new Date();

    const updatedUser = await this.usersRepo.save(user);
    return new UserResponseDto(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.usersRepo.delete({
      id,
    });
  }
}
