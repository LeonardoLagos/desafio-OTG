import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ProductCategory } from '../entities/enums/productCategory.enum';

export class Product1727442999123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productCategoryItens = Object.keys(ProductCategory).map(key => {
      return ProductCategory[key];
    });

    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 18,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'category',
            type: 'enum',
            enum: productCategoryItens,
            enumName: 'productCategory',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
