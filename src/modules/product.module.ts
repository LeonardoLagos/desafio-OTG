import { Module } from '@nestjs/common';
import { ProductController } from '../controllers/product.controller';
import { productProviders } from '../providers/product.providers';
import { ProductService } from '../services/product.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class productModule {}
