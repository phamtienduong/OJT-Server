import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite_product.service';
import { FavoriteProductController } from './favorite_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProductEntity } from './entities/favorite_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProductEntity])],
  controllers: [FavoriteProductController],
  providers: [FavoriteProductService],
})
export class FavoriteProductModule {}
