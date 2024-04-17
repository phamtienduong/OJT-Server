
import { ProductEntity } from "src/modules/products/entities/product.entity";
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

    @ManyToOne(()=> ProductEntity, (product) => product.carts)
    @JoinColumn({name: "product_id"})
    product_id: ProductEntity
 }
