import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Titel des Projekts',
    example: 'Portfolio Website',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Beschreibung des Projekts',
    example: 'Ein Portfolio mit Angular',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Bild-URL des Projekts',
    example: 'https://example.com/project.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({
    description: 'Repository-URL des Projekts',
    example: 'https://github.com/user/project',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  repo_url?: string;

  @ApiProperty({
    description: 'Live-URL des Projekts',
    example: 'https://project-live.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  live_url?: string;

  @ApiProperty({
    description: 'Kategorie-ID des Projekts',
    example: '3f29b98d-88e6-4d44-90b3-0a5c1c2c712f',
  })
  @IsUUID()
  category_id: string;
}
