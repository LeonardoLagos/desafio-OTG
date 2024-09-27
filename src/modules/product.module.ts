import { Module } from '@nestjs/common';
import { productProviders } from 'src/providers/product.providers';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class productModule {}
