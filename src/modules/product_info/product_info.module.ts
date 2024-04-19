import { Module } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { ProductInfoController } from './product_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfoEntity } from './entities/product_info.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { ImageEntity } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfoEntity,CategoryEntity,ProductEntity, ImageEntity])],
  controllers: [ProductInfoController],
  providers: [ProductInfoService, ImageService],
})
export class ProductInfoModule {}