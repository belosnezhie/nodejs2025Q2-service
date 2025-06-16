import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import 'dotenv/config';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../user/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_SECRET_REFRESH_KEY: string;
  private readonly TOKEN_EXPIRE_TIME: string;
  private readonly TOKEN_REFRESH_EXPIRE_TIME: string;

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret123123';
    this.JWT_SECRET_REFRESH_KEY =
      process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';
    this.TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
    this.TOKEN_REFRESH_EXPIRE_TIME =
      process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';
  }

  async signup(signupDto: CreateAuthDto) {
    const isUser = await this.userRepo.findOne({
      where: { login: signupDto.login },
    });

    if (isUser) {
      throw new ForbiddenException('User already exists.');
    }

    return await this.usersService.create(signupDto);
  }

  async login(loginDto: CreateAuthDto) {
    const user = await this.userRepo.findOne({
      where: { login: loginDto.login },
    });

    if (!user) {
      throw new ForbiddenException('User does not exist.');
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new ForbiddenException('Password is wrong.');
    }

    return await this.generateTokens(user.id, user.login);
  }

  async refresh(refrechTokenDto: RefreshTokenDto) {
    const payload = await this.jwtService.verifyAsync(
      refrechTokenDto.refreshToken,
      {
        secret: this.JWT_SECRET_REFRESH_KEY,
      },
    );

    const user = await this.userRepo.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    return await this.generateTokens(user.id, user.login);
  }
  catch() {
    throw new UnauthorizedException('Invalid or expired refresh token.');
  }

  private async generateTokens(userId: string, login: string) {
    const payload = { sub: userId, login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.JWT_SECRET_KEY,
      expiresIn: this.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.JWT_SECRET_REFRESH_KEY,
      expiresIn: this.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }
}
