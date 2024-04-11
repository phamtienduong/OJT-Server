import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ImageEntity } from 'src/modules/image/entities/image.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_info' })
export class ProductInfoEntity {
  @PrimaryGeneratedColumn()
  product_info_id: number;
  @Column()
  color: string;
  @Column()
  ram: string;
  @Column({
    type: 'decimal',
    precision: 10, // Số lượng chữ số trước và sau dấu thập phân
    scale: 0, // Số lượng chữ số sau dấu thập phân
  })
  price: number;
  @Column()
  stock: number;

  @OneToOne(() => ProductEntity, (product) => product.product_info)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductEntity;

  @OneToMany(()=>CartEntity,(cart)=>cart.product_info_id )
  carts:CartEntity[]

  @OneToMany(()=>ImageEntity,(image)=>image.product_info_id)
  images:ImageEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.product_info)
  @JoinColumn({ name: 'category_id' })
  category_id: CategoryEntity;
}
