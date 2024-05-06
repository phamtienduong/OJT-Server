import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async addToCart(user_id: number, product_id: any) {
    const checkCart = await this.findOne(user_id, product_id);
    // console.log(checkCart);
    if (checkCart.length > 0) {
      const updateCart = await this.cartRepository
        .createQueryBuilder()
        .update(CartEntity)
        .set({ quantity: checkCart[0].quantity + 1 })
        .where('user_id = :user_id', { user_id: user_id })
        .andWhere('product_id = :product_id', {
          product_id: product_id,
        })
        .execute();
      return {
        message: 'Add product to cart successfully',
        data: updateCart,
      };
    } else {
      const newCart = await this.cartRepository
        .createQueryBuilder()
        .insert()
        .into(CartEntity)
        .values({
          quantity: 1,
          user_id: user_id as any,
          product_id: product_id,
        })
        .execute();
      return {
        message: 'Add to cart successfully',
        data: newCart,
      };
    }
  }
  async findOne(user_id: number, product_id: any) {
    // console.log(userid,productid,"vao check")

    const checkCart = await this.cartRepository
      .createQueryBuilder()
      .select('*')
      .where('user_id = :user_id', { user_id: user_id })
      .andWhere('product_id = :product_id', {
        product_id: product_id,
      })
      .execute();
    // return `This action returns a #${id} cart`;
    return checkCart;
  }
  async listCart(user_id: number) {
    const checkCart = await this.cartRepository
      .createQueryBuilder('cart')
      .innerJoinAndSelect('cart.product_id', 'product') // Sử dụng alias "product" thay vì "products"
      .innerJoinAndSelect('product.impds', 'images')
      .innerJoinAndSelect('product.product_info', 'product_info')
      .where('cart.user_id = :user_id', { user_id: user_id })
      .getMany();
    return checkCart;
  }

  async updateQuantityIncre(creatquantity: any) {
    try {
      const cart = await this.cartRepository
        .createQueryBuilder()
        .update(CartEntity)
        .set({ quantity: () => 'quantity + 1' }) // Tăng quantity lên 1
        .where('cart_id = :cart_id', { cart_id: creatquantity.cart_id })
        .execute();
      return {
        message: 'Update quantity successfully',
        data: cart,
      };
    } catch (error) {
      // Xử lý lỗi
      console.log(error);
      return {
        message: 'Failed to update quantity',
        error: error.message,
      };
    }
  }

  async updateQuantityDecre(creatquantity: any) {
    try {
      const cart = await this.cartRepository
        .createQueryBuilder()
        .update(CartEntity)
        .set({ quantity: () => 'quantity - 1' }) // Giảm quantity đi 1
        .where('cart_id = :cart_id', { cart_id: creatquantity.cart_id })
        .execute();
      return {
        message: 'Update quantity successfully',
        data: cart,
      };
    } catch (error) {
      // Xử lý lỗi
      console.log(error);
      return {
        message: 'Failed to update quantity',
        error: error.message,
      };
    }
  }
  async deleteCart(cart_id: number) {
    const deleteCarts = await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where('cart_id = :cart_id', { cart_id: cart_id })
      .execute();

    return {
      message: 'Delete all carts successfully',
      data: deleteCarts,
    };
  }
}
