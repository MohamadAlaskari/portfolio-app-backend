import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('projects')
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  githubLink?: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  link?: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ type: () => Category, nullable: true })
  @ManyToOne(() => Category, (category) => category.projects, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;
}
