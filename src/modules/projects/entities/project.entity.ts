import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ type: () => Category, nullable: true })
  @ManyToOne(() => Category, (category) => category.projects, { nullable: true, onDelete: 'SET NULL' })
  category: Category;
}
