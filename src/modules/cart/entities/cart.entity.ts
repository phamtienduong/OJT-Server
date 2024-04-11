
import { ProductInfoEntity } from "src/modules/product_info/entities/product_info.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

 @Entity({ name: "cart" })
 export class CartEntity {
    @PrimaryGeneratedColumn()
    cart_id: number
    @Column()
    quantity: number

    @ManyToOne(() => UserEntity, (user) => user.carts)
    @JoinColumn({name: "user_id"})
    user_id: UserEntity

    @ManyToOne(()=> ProductInfoEntity, (product) => product.carts)
    @JoinColumn({name: "product_info_id"})
    product_info_id: ProductInfoEntity
 }
