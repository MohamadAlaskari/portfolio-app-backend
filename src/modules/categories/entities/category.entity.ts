import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Eindeutige ID der Kategorie' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Name der Kategorie',
    example: 'Web Development',
  })
  name: string;

  @OneToMany(() => Project, (project) => project.category)
  @ApiProperty({
    description: 'Liste der Projekte in dieser Kategorie',
    type: () => [Project],
  })
  projects: Project[];

  @CreateDateColumn()
  @ApiProperty({ description: 'Erstellungsdatum' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Aktualisierungsdatum' })
  updated_at: Date;
}
