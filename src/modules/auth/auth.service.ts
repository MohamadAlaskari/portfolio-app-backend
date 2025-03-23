import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  login(loginDto: LoginDto) {
    return loginDto;
  }
  async register(registerDto: RegisterDto) {
    const createdUser = await this.userService.create(registerDto);
    // @TODO generate JWT Token
    return createdUser;
  }
}
