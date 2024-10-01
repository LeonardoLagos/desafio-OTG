import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from 'src/database/dto/create-product.dto';
import { UpdateProductDto } from 'src/database/dto/update-product.dto';
import { ProductCategory } from 'src/database/entities/enums/productCategory.enum';
import { Product } from 'src/database/entities/product.entity';
import { ProductService } from 'src/services/product.service';
import { ProductController } from '../product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Laptop',
          description: 'A high-end gaming laptop',
          price: 1299.99,
          category: 'eletronics',
        },
      ])
    ),
    findById: jest.fn((id: string) =>
      Promise.resolve({
        id,
        name: 'Laptop',
        description: 'A high-end gaming laptop',
        price: 1299.99,
        category: 'eletronics',
      })
    ),
    create: jest.fn((dto: CreateProductDto) =>
      Promise.resolve('Product created with sucess!')
    ),
    update: jest.fn((id: string, dto: UpdateProductDto) =>
      Promise.resolve('Product updated with sucess!')
    ),
    remove: jest.fn((id: string) =>
      Promise.resolve('Product removed with sucess!')
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const dto: CreateProductDto = {
        name: 'Phone',
        description: 'A smartphone',
        price: 699.99,
        category: ProductCategory.ELETRONICS,
      };

      const result = await controller.create(dto);
      expect(result).toBe('Product created with sucess!');
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Laptop',
          description: 'A high-end gaming laptop',
          price: 1299.99,
          category: 'eletronics',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const result = await controller.findOne(
        '550e8400-e29b-41d4-a716-446655440000'
      );
      expect(result).toEqual({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Laptop',
        description: 'A high-end gaming laptop',
        price: 1299.99,
        category: ProductCategory.ELETRONICS,
      });
      expect(service.findById).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000'
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto: UpdateProductDto = {
        name: 'Updated Laptop',
        description: 'An updated high-end gaming laptop',
        price: 1399.99,
        category: ProductCategory.ELETRONICS,
      };

      const result = await controller.update(
        '550e8400-e29b-41d4-a716-446655440000',
        dto
      );
      expect(result).toBe('Product updated with sucess!');
      expect(service.update).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000',
        dto
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const result = await controller.remove(
        '550e8400-e29b-41d4-a716-446655440000'
      );
      expect(result).toBe('Product removed with sucess!');
      expect(service.remove).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000'
      );
    });
  });

  describe('maximizeproducts', () => {
    it('should return a list of products', async () => {
      const body = {
        products: [
          { id: '1', name: 'Produto A', price: 50 },
          { id: '2', name: 'Produto B', price: 30 },
          { id: '3', name: 'Produto C', price: 20 },
          { id: '4', name: 'Produto D', price: 60 },
        ] as Product[],
        budget: 100,
      };
      const result = await controller.maximizeProducts(body);
      expect(result).toStrictEqual([
        { id: '3', name: 'Produto C', price: 20 },
        { id: '2', name: 'Produto B', price: 30 },
        { id: '1', name: 'Produto A', price: 50 },
      ]);
    });
  });
});
