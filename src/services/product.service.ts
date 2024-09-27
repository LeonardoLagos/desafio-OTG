import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: Repository<Product>
  ) {}

  getAll = async (): Promise<Product[] | Error> => {
    try {
      const dbResponse = await this.repository.find();
      return dbResponse;
    } catch (error) {
      return new Error(error.message);
    }
  };

  getById = async (id: string): Promise<Product | Error> => {
    try {
      const dbResponse = await this.repository.findOneBy({ id: id });
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  add = async (product: Product): Promise<Product | Error> => {
    try {
      const dbResponse = await this.repository.save(product);
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (product: Product): Promise<Product | Error> => {
    try {
      if (!product.id) throw new Error('Item não possui uma chave');

      const queryResult = await this.repository.findOneBy({ id: product.id });

      if (!queryResult) throw new Error('Chave inexistente');

      const dbResponse = await this.repository.save(product);
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  remove = async (product: Product): Promise<Product | Error> => {
    try {
      const dbResponse = await this.repository.remove(product);
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
