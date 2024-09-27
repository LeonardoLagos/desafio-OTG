import { NestFactory } from '@nestjs/core';
import { productModule } from './modules/product.module';

async function bootstrap() {
  const app = await NestFactory.create(productModule, { abortOnError: false });
  await app.listen(3000);
}
bootstrap();
