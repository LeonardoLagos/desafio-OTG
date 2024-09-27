import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { productModule } from './modules/product.module';

async function bootstrap() {
  const app = await NestFactory.create(productModule, { abortOnError: false });

  const config = new DocumentBuilder()
    .setTitle('API de Produtos')
    .setDescription('API para gerenciar produtos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
