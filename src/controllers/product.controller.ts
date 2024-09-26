import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Controller()
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get()
  getHello(): string {
    return this.ProductService.getHello();
  }
}
