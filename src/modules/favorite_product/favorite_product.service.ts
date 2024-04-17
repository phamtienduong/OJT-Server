import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProductEntity } from './entities/favorite_product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteProductService {
  constructor(@InjectRepository(FavoriteProductEntity) private favoriteRepository: Repository<FavoriteProductEntity>) { }
  addFavoriteProduct(user_id: number, product_id: number) {
    return this.favoriteRepository.createQueryBuilder('favorite')
      .insert()
      .into(FavoriteProductEntity)
      .values({
        user_id: user_id as any,
        product_id: product_id as any
      })
      .execute()
  }

  getAllFavor(user_id: number) {
    return this.favoriteRepository.createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.product_id', 'product')
      .leftJoinAndSelect('favorite.user_id', 'user')
      .where('user.user_id = :id', { id: user_id })
      .getMany();
  }

  removeFavorite(id: number, product_id: number) {
    return this.favoriteRepository.createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.product_id', 'product')
      .leftJoinAndSelect('favorite.user_id', 'user')
      .delete()
      .from(FavoriteProductEntity)
      .where('user.user_id = :id', { id })
      .andWhere('product.product_id = :product_id', { product_id })
      .execute()
  }
}
