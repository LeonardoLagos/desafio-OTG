import { ProductCategory } from 'src/database/entities/enums/productCategory.enum';

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
}
