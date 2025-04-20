import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    CategoriesModule,
    ProjectsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
