import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity,UserEntity,ProductEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
