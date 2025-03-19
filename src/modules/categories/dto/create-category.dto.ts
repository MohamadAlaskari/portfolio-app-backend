import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Webentwicklung' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
