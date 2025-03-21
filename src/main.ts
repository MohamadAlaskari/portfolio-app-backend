import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Auto-Validation
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API Documentation für Portfolio-App')
    .setVersion('1.0')
    //.addTag('Portfolio API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  //http://localhost:3000/swagger/
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
