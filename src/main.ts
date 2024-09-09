import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // adicionar bearer auth
  const configSwagger = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Loomi Challenge')
    .setVersion('0.1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, swaggerDocument, {
    jsonDocumentUrl: 'doc/json',
  });

  await app.listen(3000);
}
bootstrap();
