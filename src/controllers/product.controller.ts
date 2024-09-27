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
import { Product } from 'src/database/entities/product.entity';
import { ProductService } from 'src/services/product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: Product,
  })
  create(@Body() createTesteDto: CreateProductDto) {
    return this.productService.create(createTesteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos.',
    type: [Product],
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'string' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'string' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
