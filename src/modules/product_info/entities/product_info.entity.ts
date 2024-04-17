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
  
  @Column()
  stock: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_info)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductEntity;

  @OneToMany(()=>ImageEntity,(image)=>image.product_info_id)
  images:ImageEntity[];


}
