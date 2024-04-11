import { UserRole } from 'src/constant/enum';
import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { BillEntity } from 'src/modules/bills/entities/bill.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { FavoriteProductEntity } from 'src/modules/favorite_product/entities/favorite_product.entity';
import { ReviewEntity } from 'src/modules/review/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column()
  user_name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({ default: 'http://surl.li/rrtgf' })
  avatar: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;
  @Column({ type: 'tinyint', default: 0 })
  status: number;

  @OneToMany(() => AddressEntity, (address) => address.user_id)
  address: AddressEntity[];

  @OneToMany(() => BillEntity, (bill) => bill.user_id)
  bills: BillEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user_id)
  carts: CartEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user_id)
  reviews: ReviewEntity[];

  @OneToMany(
    () => FavoriteProductEntity,
    (favorite_product) => favorite_product.user_id,
  )
  favorite_products: FavoriteProductEntity[];
}
