import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../services/product.service';
import { ProductController } from '../product.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(ProductController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
