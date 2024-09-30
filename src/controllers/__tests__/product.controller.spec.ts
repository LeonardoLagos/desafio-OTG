import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from 'src/database/dto/create-product.dto';
import { UpdateProductDto } from 'src/database/dto/update-product.dto';
import { ProductCategory } from 'src/database/entities/enums/productCategory.enum';
import { ProductService } from 'src/services/product.service';
import { ProductController } from '../product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    create: jest.fn((dto: CreateProductDto) => ({
      id: '1',
      ...dto,
    })),
    findAll: jest.fn(() => [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100.0,
        category: ProductCategory.ELETRONICS,
      },
    ]),
    findById: jest.fn((id: string) => ({
      id,
      name: 'Product 1',
      description: 'Description 1',
      price: 100.0,
      category: ProductCategory.ELETRONICS,
    })),
    update: jest.fn((id: string, dto: UpdateProductDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({
      id,
      deleted: true,
    })),
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

  it('should create a product', async () => {
    const createDto: CreateProductDto = {
      name: 'Product 1',
      description: 'Description 1',
      price: 100.0,
      category: ProductCategory.ELETRONICS,
    };
    expect(await controller.create(createDto)).toEqual({
      id: '1',
      ...createDto,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should return all products', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100.0,
        category: ProductCategory.ELETRONICS,
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single product by id', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100.0,
      category: ProductCategory.ELETRONICS,
    });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should update a product', async () => {
    const updateDto: UpdateProductDto = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150.0,
      category: ProductCategory.CLOTHES,
    };
    expect(await controller.update('1', updateDto)).toEqual({
      id: '1',
      ...updateDto,
    });
    expect(service.update).toHaveBeenCalledWith('1', updateDto);
  });

  it('should remove a product', async () => {
    expect(await controller.remove('1')).toEqual({
      id: '1',
      deleted: true,
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
