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
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const product_info = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product_id', 'product')
      .leftJoinAndSelect('cart.user_id', 'users')
      .getMany();

    return product_info;
  }

  async getOne(param) {
    console.log(param.id);
    const user_id = param.id;
    const product_info = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.user_id = :user_id', { user_id })
      .leftJoinAndSelect('cart.product_id', 'product')
      .getMany();
    return product_info;
  }

  async addToCart(body: CreateCartDto) {
    const { user_id, product_id, quantity } = body;
    // console.log(body)
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id = :user_id', { user_id })
      .getOne();

    const product = await this.productRepository
      .createQueryBuilder('product')
      .where('product.product_id = :product_id', { product_id })
      .getOne();

    const cartItem = this.cartRepository.create({
      user_id: user,
      product_id: product,
      quantity: 1,
    });

    const savedCartItem = await this.cartRepository.save(cartItem);

    return { message: 'Thêm vào giỏ hàng thành công' };
  }

  async updateCart(body: UpdateCartDto, param: any) {
    const { status, product_id } = body;
    const user_id = param.id;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id = :user_id', { user_id })
      .getOne();
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.user_id = :user_id', { user_id })
      .andWhere('cart.product_id = :product_id', { product_id })
      .getOne();
    // console.log(cart.cart_id)
    if (!cart) {
      return { message: 'Không tìm thấy cart' };
    }

    // console.log(cart.quantity)
    const savedCart = await this.cartRepository
      .createQueryBuilder()
      .update(CartEntity)
      .set({ quantity: cart.quantity + status })
      .where('cart.cart_id = :cart_id', { cart_id: cart.cart_id })
      .execute();

    return { message: 'cap nhap thanh cong' };
  }

  async deleteCart(body: UpdateCartDto, param: any) {

    try {
      const product_id= body.product_id;
      // console.log(body)
      const user_id = param.id;
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.user_id = :user_id', { user_id })
        .getOne();
      const cart = await this.cartRepository
        .createQueryBuilder('cart')
        .where('cart.user_id = :user_id', { user_id })
        .andWhere('cart.product_id = :product_id', { product_id })
        .getOne();
      // console.log(cart.cart_id)
      if (!cart) {
        return { message: 'Không tìm thấy cart' };
      }
      const savedCart = await this.cartRepository
        .createQueryBuilder()
        .delete()
        .from(CartEntity)
        .where('cart.cart_id = :cart_id', { cart_id: cart.cart_id })
        .execute();

      return { message: 'Xóa thành công' };
    } catch (error) {
      console.error(error);
      throw new Error('Có lỗi xảy ra khi xóa giỏ hàng.');
    }
  }
}
