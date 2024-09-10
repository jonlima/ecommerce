import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigService } from './shared/infra/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfigService = app.get<EnvConfigService>(EnvConfigService);
  const port = envConfigService.get('port');

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

  await app.listen(port);
}
bootstrap();
