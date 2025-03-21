import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Eindeutige ID des Projekts' })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Titel des Projekts',
    example: 'Portfolio Website',
  })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Beschreibung des Projekts',
    example: 'Ein persönliches Portfolio mit Angular',
  })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Bild-URL des Projekts',
    example: 'https://example.com/project.jpg',
  })
  img_url?: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Repository-URL des Projekts',
    example: 'https://github.com/user/project',
  })
  repo_url?: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Live-URL des Projekts',
    example: 'https://project-live.com',
  })
  live_url?: string;

  @ManyToOne(() => Category, (category) => category.projects, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({ description: 'Kategorie des Projekts', type: () => Category })
  category: Category;

  @CreateDateColumn()
  @ApiProperty({ description: 'Erstellungsdatum' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Aktualisierungsdatum' })
  updated_at: Date;
}
