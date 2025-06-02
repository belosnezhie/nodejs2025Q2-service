import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { UsersRepository } from 'src/db/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject()
    private readonly usersRepo: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepo.create(createUserDto);
    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const res = [];
    const users = await this.usersRepo.findAll();
    users.forEach((user) => {
      res.push(new UserResponseDto(user));
    });
    return res;
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return new UserResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong.');
    }

    const updatedUser = await this.usersRepo.update(id, updateUserDto);
    return new UserResponseDto(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    this.usersRepo.delete(id);
  }
}
