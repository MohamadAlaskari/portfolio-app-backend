import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, ProjectsModule, UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
