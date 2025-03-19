/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Portfolio-Webseite',
    description: 'Titel des Projekts',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Eine Beschreibung...', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://image.com/meinbild.jpg', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({
    example: 'https://github.com/username/repository',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  githubLink?: string;

  @ApiProperty({ example: 'https://projekt-link.com', required: false })
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiProperty({ example: 1, description: 'ID der Kategorie' })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
