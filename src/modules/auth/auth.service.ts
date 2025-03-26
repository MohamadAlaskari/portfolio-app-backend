import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const accessToken = await this.generateJWT({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.system_role,
    });
    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<AccessTokentype> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    const accessToken = await this.generateJWT({
      id: user.id,
      email: user.email,
      role: user.system_role,
    });
    //  generate JWT Token
    return { accessToken };
  }

  async getCurrentUser(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  private async generateJWT(payload: JWTPayloadTypes): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
