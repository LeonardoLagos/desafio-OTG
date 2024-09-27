import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/database/dto/create-product.dto';
import { UpdateProductDto } from 'src/database/dto/update-product.dto';
import { Product } from 'src/database/entities/product.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: Repository<Product>
  ) {}

  findAll = async (): Promise<Product[] | Error> => {
    try {
      const dbResponse = await this.repository.find();
      return dbResponse;
    } catch (error) {
      return new Error(error.message);
    }
  };

  findById = async (id: string): Promise<Product | Error> => {
    try {
      const dbResponse = await this.repository.findOneBy({ id: id });
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (product: CreateProductDto): Promise<InsertResult | Error> => {
    try {
      const dbResponse = await this.repository.insert(product);
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (
    id: string,
    product: UpdateProductDto
  ): Promise<UpdateResult | Error> => {
    try {
      if (!id) throw new Error('Item não possui uma chave');

      const dbResponse = await this.repository.update(id, product);
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  remove = async (id: string): Promise<DeleteResult | Error> => {
    try {
      const dbResponse = await this.repository.delete(id);
      return dbResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
