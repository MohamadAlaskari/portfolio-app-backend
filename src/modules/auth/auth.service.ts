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
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AccessTokentype> {
    const createdUser = await this.usersService.create(registerDto);
    //  generate JWT Token
    const accessToken = await this.generateJWT({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.system_role,
    });
    this.mailService.sendVerificationEmail(
      createdUser.email,
      accessToken,
      'http://localhost:3000',
    );
    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<AccessTokentype> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user?.isEmailVerified) {
      throw new UnauthorizedException('you have to verify your Email');
    }
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
    const baseUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

    await this.mailService.sendVerificationEmail(
      user.email,
      accessToken,
      baseUrl,
    );

    //  generate JWT Token
    return { accessToken };
  }

  async getCurrentUser(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
  async verifyEmail(token: string) {
    try {
      const payload: JWTPayloadTypes = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findOne(payload.id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.isEmailVerified) {
        return { message: 'Email is already verified.' };
      }

      user.isEmailVerified = true;
      await this.usersService.update(user.id, user); // تأكد أن update() تعمل بشكل صحيح

      return { message: 'Email successfully verified.' };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  private async generateJWT(payload: JWTPayloadTypes): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
