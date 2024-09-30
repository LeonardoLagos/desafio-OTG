import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from 'src/database/dto/create-product.dto';
import { UpdateProductDto } from 'src/database/dto/update-product.dto';
import { ProductService } from 'src/services/product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created with success!',
    content: {
      'application/json': {
        example: {
          message: 'Product created with success!',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: 'Invalid product data',
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({
    status: 200,
    description: 'Product list',
    content: {
      'application/json': {
        schema: {
          example: [
            {
              id: '550e8400-e29b-41d4-a716-446655440000',
              name: 'Laptop',
              description: 'A high-end gaming laptop',
              price: 1299.99,
              category: 'eletronics',
            },
            {
              id: '550e8400-e29b-41d4-a716-446655440001',
              name: 'T-shirt',
              description: 'A comfortable cotton t-shirt',
              price: 19.99,
              category: 'clothes',
            },
          ],
        },
      },
    },
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'Product ID (UUID format)',
    type: 'string',
    example: '550e8400-e29b-41d4-a716-446655440000', // Example for UUID
  })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    content: {
      'application/json': {
        schema: {
          example: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Laptop',
            description: 'A high-end gaming laptop',
            price: 1299.99,
            category: 'eletronics',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Product not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({
    name: 'id',
    description: 'Product ID (UUID format)',
    type: 'string',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product updated with success!',
    content: {
      'application/json': {
        example: {
          message: 'Product updated with success!',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data for product update',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: 'Invalid product data',
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a Product' })
  @ApiParam({
    name: 'id',
    description: 'Product ID (UUID format)',
    type: 'string',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Product removed with success!',
    content: {
      'application/json': {
        example: {
          message: 'Product removed with success!',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Product not found',
        },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
