import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, JWTPayloadTypes } from 'src/common/utils/types';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AccessTokentype> {
    const createdUser = await this.userService.create(registerDto);
    //  generate JWT Token
    return this.generateJWT({ id: createdUser.id, email: createdUser.email });
  }

  async login(loginDto: LoginDto): Promise<AccessTokentype> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('invalid email or password');
    }

    //  generate JWT Token
    return this.generateJWT({ id: user.id, email: user.email });
  }

  private async generateJWT(payload: JWTPayloadTypes) {
    const payloadJWT: JWTPayloadTypes = {
      id: payload.id,
      email: payload.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(payloadJWT),
    };
  }
}
