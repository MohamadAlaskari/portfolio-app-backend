import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name der Kategorie',
    example: 'Web Development',
  })
  @IsNotEmpty()
  name: string;
}
