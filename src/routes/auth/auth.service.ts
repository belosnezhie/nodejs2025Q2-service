import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../user/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Auth)
    private authRepo: Repository<Auth>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: CreateAuthDto): Promise<{ access_token: string }> {
    // const user = await this.usersService.findOne(username);
    const user = await this.userRepo.findOne({});

    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.login, username: user.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
