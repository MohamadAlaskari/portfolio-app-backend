import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Benutzer-Login' })
  @ApiResponse({ status: 200, description: 'Erfolgreiche Authentifizierung' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Benutzer-Registrierung' })
  @ApiResponse({ status: 201, description: 'Benutzer erfolgreich registriert' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
