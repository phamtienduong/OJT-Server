import { Injectable } from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInfoEntity } from './entities/product_info.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectRepository(ProductInfoEntity)
    private readonly productInfoRepository: Repository<ProductInfoEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll() {
    // const product_info = await this.productInfoRepository
    //   .createQueryBuilder('product_info')
    //   .leftJoinAndSelect('product_info.product_id', 'product')
    //   .leftJoinAndSelect('product_info.category_id', 'category')
    //   .select(['product.product_id', 'category.category_id'])
    //   .getMany();
   const product_info = await this.productInfoRepository
     .createQueryBuilder('product_info')
     .leftJoinAndSelect('product_info.product_id', 'product')
     .leftJoinAndSelect('product_info.category_id', 'category')
     .getMany();

   return product_info;
  }
  async getOne(param: any) {
    const product_id = param.id;
    const product_info = await this.productInfoRepository
      .createQueryBuilder('product_info')
      .where('product_info.product_id = :product_id', { product_id })
      .getMany();
    return product_info;
  }

  async createDetail(body: CreateProductInfoDto, param: any) {
    // console.log(body,param.id)
    try {
      const product_id = param.id;
      const { color, ram, stock, category_id } = body;

      // console.log(typeof(category_id))
      const category = await this.categoryRepository.findOne({
        where: { category_id },
      });
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      const newProductInfo = this.productInfoRepository.create({
        color,
        ram,
        stock,
        product_id: product,
      });
      // console.log(newProductInfo)
      const result = await this.productInfoRepository.save(newProductInfo);
      return { message: 'thêm thành công' };
    } catch (error) {
      console.log(error);
    }
  }
  async updateDetail(body: UpdateProductInfoDto, param: any, param2: any) {
    // console.log(body,param,param2)
    try {
      const product_id = param;
      const product_info_id = param2;
      const { color, ram, stock, category_id } = body;
      const category = await this.categoryRepository.findOne({
        where: { category_id },
      });
      if (!category) {
        return { success: false, message: 'Category not found' };
      }
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      const updateResult = await this.productInfoRepository
        .createQueryBuilder('product_info')
        .update()
        .set({
          color,
          ram,
          stock,
          product_id: product,
        })
        .where('product_info.product_info_id = :product_info_id', {
          product_info_id: product_info_id,
        })
        .execute();

      if (updateResult.affected !== 0) {
        return {
          success: true,
          message: 'Cập nhật product detail thành công',
        };
      } else {
        return { success: false, message: 'Lỗi sửa product detail' };
      }
    } catch (error) {
      return { success: false, message: 'Lỗi rồi' };
    }
  }

  async deleteDetail(param: any, param2: any) {
    const product_info_id = param2;
    const product_id = param;

    const deleteResult = await this.productInfoRepository
      .createQueryBuilder('product_info')
      .delete()
      .from(ProductInfoEntity)
      .where('product_info.product_info_id = :product_info_id', {
        product_info_id: product_info_id,
      })
      .execute();
    if (deleteResult.affected !== 0) {
      return {
        success: true,
        message: 'Xóa thành công product detail này',
      };
    } else {
      return { success: false, message: 'Lỗi xóa product detail' };
    }
  }
}