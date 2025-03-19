import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Project } from 'src/modules/projects/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: 'https://github.com/username/repository',
    description: 'Link to the project GitHub repository',
  })
  @Column({ nullable: true })
  githubLink: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: () => [Project] })
  @OneToMany(() => Project, (project) => project.category, { cascade: true })
  projects: Project[];
}
