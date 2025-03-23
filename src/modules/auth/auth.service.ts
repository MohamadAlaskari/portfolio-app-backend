import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadTypes } from 'src/common/utils/types';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const createdUser = await this.userService.create(registerDto);
    // @TODO generate JWT Token
    return createdUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('invalid email or password');
    }

    //  generate JWT Token
    const payload: JWTPayloadTypes = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
