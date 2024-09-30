import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/database/entities/enums/productCategory.enum';

export class CreateProductDto {
  @ApiProperty({
    example: 'Smartphone',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: 'A smartphone with many features',
    description: 'The description of the product',
  })
  description: string;

  @ApiProperty({ example: 599.99, description: 'The price of the product' })
  price: number;

  @ApiProperty({
    example: ProductCategory.ELETRONICS,
    enum: ProductCategory,
    description: 'The category of the product',
  })
  category: ProductCategory;
}
