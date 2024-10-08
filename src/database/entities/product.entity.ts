import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './enums/productCategory.enum';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: false })
  price: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    nullable: false,
  })
  category: ProductCategory;
}
