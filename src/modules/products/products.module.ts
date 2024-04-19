import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ImageEntity } from '../image/entities/image.entity';
import { Impd } from '../impd/entity/impd.entity';
import { ImpdModule } from '../impd/impd.module';
// import { ImageProductEntity } from './entities/image-product.entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, ImageEntity, Impd]),
    ImpdModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
