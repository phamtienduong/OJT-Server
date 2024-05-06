import { Injectable, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

import { DataSource, Repository } from 'typeorm';
import { Impd } from '../impd/entity/impd.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(Impd) private readonly impdRepository: Repository<Impd>,
    private readonly dataSource: DataSource,
  ) {}

  async createProduct(body: CreateProductDto) {
    console.log(body);
    try {
      const newProduct = this.productRepository.create(body);
      const result = await this.productRepository
        .createQueryBuilder('products')
        .insert()
        .into(ProductEntity)
        .values(newProduct)
        .execute();

      if (result.raw.affectedRows) {
        return { message: 'Thêm vào thành công', status: 1, data: result };
      } else {
        return { message: 'Không thành công' };
      }
    } catch (error) {
      return { message: 'Đã xảy ra lỗi' };
    }
  }
  async getProductById(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.impds', 'images')
      .leftJoinAndSelect('products.product_info', 'product_info')
      .where('products.product_id = :id', { id: id })
      .getOne();
    return product;
  }

  async createImages(data: string[], id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    for (let i = 0; i < data.length; i++) {
      await queryRunner.manager.query(
        `INSERT INTO images (url, product_id) VALUES ('${data[i]}', '${id}')`,
      );
    }
    await queryRunner.release();
  }
  async getAll() {
    const qb = this.productRepository.createQueryBuilder('products');
    qb.leftJoinAndSelect('products.reviews', 'reviews');
    qb.leftJoinAndSelect('products.category_id', 'category');
    qb.leftJoinAndSelect('products.impds', 'images');
    qb.leftJoinAndSelect('products.product_info', 'product_info');

    const products = await qb.getMany();

    return products;
  }
  async getProductsByCategoryId(id: number) {
    const products = await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.impds', 'images')
      .leftJoinAndSelect('products.product_info', 'product_info')
      .where('products.category_id = :id', { id: id })
      .getMany();
    return products;
  }

  async updateProducts(body: UpdateProductDto, param: any) {
    try {
      const result = await this.productRepository
        .createQueryBuilder()
        .update(ProductEntity)
        .set(body)
        .where('product_id = :id', { id: param.id })
        .execute();

      return { message: 'Cập nhật thành công' };
    } catch (error) {
      return { message: 'Lỗi rồi' };
    }
  }

  async deleteImages(param: any) {
    try {
      await this.impdRepository
        .createQueryBuilder()
        .delete()
        .from(Impd)
        .where('product_id = :id', { id: param.id })
        .execute();
      return { message: 'Xóa này' };
    } catch (error) {
      return { message: 'Lỗi rồi' };
    }
  }
  async deleteProduct(param: any) {
    try {
      await this.productRepository
        .createQueryBuilder()
        .delete()
        .from(ProductEntity)
        .where('product_id = :id', { id: param.id })
        .execute();
      return { message: 'Xóa thành công' };
    } catch (error) {
      return { message: 'Lỗi rồi' };
    }
  }

  async updateImage(data: any) {
    try {
      const { id, url } = data;

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      await queryRunner.manager.query(
        `UPDATE images SET url='${url}' WHERE id=${id};`,
      );

      await queryRunner.release();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
