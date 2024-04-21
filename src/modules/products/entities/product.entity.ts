import { BillDetailEntity } from 'src/modules/bill_detail/entities/bill_detail.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { FavoriteProductEntity } from 'src/modules/favorite_product/entities/favorite_product.entity';
import { Impd } from 'src/modules/impd/entity/impd.entity';
import { ProductInfoEntity } from 'src/modules/product_info/entities/product_info.entity';
import { ReviewEntity } from 'src/modules/review/entities/review.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;
  @Column()
  product_name: string;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
  })
  price: number;
  @Column()
  description: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createaAt: Date;
  @Column({
    type: 'tinyint',
    default: 1,
  })
  active: number;
  @Column({
    type: 'longtext',
  })
  default_image: string;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 1,
  })
  discount: number;




  @OneToMany(() => ProductInfoEntity, (product_info) => product_info.product_id)
  product_info: ProductInfoEntity;

  @OneToMany(() => ReviewEntity, (review) => review.product_id)
  reviews: ReviewEntity[];

  @OneToMany(
    () => FavoriteProductEntity,
    (favorite_product) => favorite_product.product_id,
  )
  favorites: FavoriteProductEntity[];

  @OneToMany(() => BillDetailEntity, (bill_detail) => bill_detail.product_id)
  bill_details: BillDetailEntity[];


  @OneToMany(() => CartEntity, (cart) => cart.product_id)
  carts: CartEntity[];


  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category_id: CategoryEntity;


  @OneToMany(() => Impd, impd => impd.product)
  impds: Impd[];

}
