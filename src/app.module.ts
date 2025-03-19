import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, ProjectsModule, UsersModule, CategoriesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
