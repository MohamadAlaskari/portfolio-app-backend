import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // *Globale Middleware*
  //Auto-Validation
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors();
  // Swagger API-Dokumentation einrichten
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
