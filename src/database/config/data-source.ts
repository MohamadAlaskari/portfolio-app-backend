import 'dotenv/config';
import { DataSource } from 'typeorm';
import { dbConfig } from '../config/db.config';
import { User } from 'src/modules/users/entities/user.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Project } from 'src/modules/projects/entities/project.entity';

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [User, Category, Project],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
