import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ProductInfoEntity } from '../product_info/entities/product_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity,ProductInfoEntity])],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
