import { ProductEntity } from "src/modules/products/entities/product.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "favorite_product" })
export class FavoriteProductEntity {
    @PrimaryGeneratedColumn()
    favorite_product_id: number

    @ManyToOne(() => UserEntity, (user) => user.favorite_products)
    @JoinColumn({ name: "user_id" })
    user_id: UserEntity

    @ManyToOne(()=>ProductEntity, (product) => product.favorites)
    @JoinColumn({ name: "product_id" })
    product_id: ProductEntity

}
