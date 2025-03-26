import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/common/utils/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'E-Mail-Adresse des Benutzers',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Passwort des Benutzers (mind. 6 Zeichen)',
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Vorname des Benutzers', example: 'John' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Nachname des Benutzers', example: 'Doe' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Profilbild-URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  profile_image?: string;

  @ApiProperty({
    description: 'Kurzbeschreibung des Benutzers',
    example: 'Full-Stack Developer',
    required: false,
  })
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: 'Systemrolle des Benutzers',
    enum: ['admin', 'user'],
    default: 'user',
  })
  @IsEnum(UserRole)
  system_role: UserRole;
}
