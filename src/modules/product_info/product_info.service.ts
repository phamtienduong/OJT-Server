import { Injectable } from '@nestjs/common';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInfoEntity } from './entities/product_info.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { ImageEntity } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
@Injectable()
export class ProductInfoService {
  constructor(
    @InjectRepository(ProductInfoEntity)
    private readonly productInfoRepository: Repository<ProductInfoEntity>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly imageService: ImageService,
  ) {}

  async getAll() {
    const product_info = await this.productInfoRepository
      .createQueryBuilder('product_info')
      .leftJoinAndSelect('product_info.product_id', 'product')
      .leftJoinAndSelect('product_info.images', 'image')
      .getMany();

    return product_info;
  }
  async getOne(param: any) {
    try {
      const product_id = param.id;
      const product_info = await this.productInfoRepository
        .createQueryBuilder('product_info')
        .leftJoinAndSelect('product_info.product_id', 'product')
        .leftJoinAndSelect('product_info.images', 'image')
        .where('product_info.product_id = :product_id', { product_id })
        .getOne();
      return product_info;
    } catch (error) {
      console.log(error);
    }
  }

  async createDetail(body: CreateProductInfoDto, param: any) {
    // console.log(body,param)
    try {
      const product_id = param.id;
      const { color, ram, stock,image_path } = body;

      // console.log(typeof(category_id))

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
      // console.log(result,"resuilt")
      const product_info_id = result.product_info_id;
      //
      const imagePathArray = Object.values(image_path);
      const imagePathString = imagePathArray.join(',');
      const newImage = await this.imageService.createDetail(
        imagePathString,
        product_info_id,
      );
      return { message: 'thêm thành công' };
    } catch (error) {
      console.log(error);
    }
  }
  async updateDetail(body: any, param: any, param2: any) {
    // console.log(body,param,param2)
    const product_id = param;
    const product_info_id = param2;
    const { color, ram, stock, image_path } = body;
  //  const image_path = body.image_path
  //
  //  console.log(body)
   const imagePathArray = Object.values(image_path);
   const imagePathString = imagePathArray.join(',');
  //  console.log(imagePathString, '==><><>');
   const imageChange = await this.imageService.updateDetail(
     imagePathString,
     param2,
   );
    try {
      

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
const deleteImg = await this.imageService.deleteDetail(param2)
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