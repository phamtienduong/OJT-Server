import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInfoEntity } from '../product_info/entities/product_info.entity';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ProductInfoEntity)
    private readonly productInfoRepository: Repository<ProductInfoEntity>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}
  async getAll() {
    const image = await this.imageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.product_info_id', 'product_info')
      .getMany();
    return image;
  }

  async getOne(param: any) {
    try {
      const product_info_id = param;
      // console.log(param)
      const image = await this.imageRepository
        .createQueryBuilder('image')
        .leftJoinAndSelect('image.product_info_id', 'product_info')
        .where('image.product_info_id = :product_info_id', { product_info_id })
        .getOne();
      return image;
    } catch (error) {
      console.log(error);
    }
  }

 async updateDetail(body: any, param:any) {
    // console.log(param)
    const product_info_id = param;;
    const image_path = body;
    // console.log(image_path,"image_path")
    try {
      const result = await this.imageRepository.createQueryBuilder("image").update(ImageEntity).set({image_path}).where("product_info_id = :product_info_id",{product_info_id}).execute();
      // console.log(result.affected)
      return {message:"Sửa ảnh thành công"}
    } catch (error) {
      console.log(error,"error")
    }
  }

  async deleteDetail(param:any){
    const product_info_id = param
    try {
      const result = await this.imageRepository.createQueryBuilder("image").delete().from(ImageEntity).where("product_info_id = :product_info_id",{product_info_id}).execute();
      return {message:"Xóa thanh cong"}
    } catch (error) {
      console.log(error,"error")
    }
  }

  async createDetail(body: any, param: any) {
    // console.log(body,param)
    try {
      const product_info_id = param;
      const  image_path  = body;
      const newImage = this.imageRepository.create({
        image_path,
        // product_info_id,
      });
      // console.log(newImage)
      const result = await this.imageRepository.save(newImage);
      return { message: 'thêm mới' };
    } catch (error) {
      console.log(error);
    }
  }
}
