import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Setup Swagger Documentation
 * @param app NestJS Application instance
 */
export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API Documentation for the Portfolio App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
