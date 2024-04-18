import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async createProduct(body: CreateProductDto) {
    try {
      const newProduct = this.productRepository.create(body);
      const result = await this.productRepository
        .createQueryBuilder('products')
        .insert()
        .into(ProductEntity)
        .values(newProduct)
        .execute();

      if (result.raw.affectedRows) {
        return { message: 'Thêm vào thành công' };
      } else {
        return { message: 'Không thành công' };
      }
    } catch (error) {
      return { message: 'Đã xảy ra lỗi' };
    }
  }

  async getAll() {
    const qb = this.productRepository.createQueryBuilder('products');
    const products = await qb.getMany();
    return products;
  }

  async updateProducts(body: UpdateProductDto, param: any) {
    // console.log(body)
    // console.log(param)
    try {
      const result = await this.productRepository
        .createQueryBuilder()
        .update(ProductEntity)
        .set(body)
        .where('product_id = :id', { id: param.id })
        .execute();

      // console.log(result);
      return { message: 'Cập nhật thành công' };
    } catch (error) {
      // console.log(error)
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
}
