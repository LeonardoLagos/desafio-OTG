import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/database/dto/create-product.dto';
import { UpdateProductDto } from 'src/database/dto/update-product.dto';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';

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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  findById = async (id: string): Promise<Product | Error> => {
    try {
      const dbResponse = await this.repository.findOneBy({ id: id });
      return dbResponse;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  create = async (product: CreateProductDto): Promise<string | Error> => {
    try {
      await this.repository.insert(product);
      return 'Product created with sucess!';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  update = async (
    id: string,
    product: UpdateProductDto
  ): Promise<string | Error> => {
    try {
      await this.repository.update(id, product);
      return 'Product updated with sucess!';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  remove = async (id: string): Promise<string | Error> => {
    try {
      await this.repository.delete(id);
      return 'Product removed with sucess!';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
}
