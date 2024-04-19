// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { ProductEntity } from "./product.entity";

// @Entity({name: "image_product"})
// export class ImageProductEntity {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     image_path: string;

//     @ManyToOne(() => ProductEntity, product => product.images)
//     @JoinColumn({name: "product_id"})
//     product: ProductEntity;
// }