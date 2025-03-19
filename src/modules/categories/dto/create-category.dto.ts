import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Webentwicklung' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Alle Projekte im Bereich Webentwicklung',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
