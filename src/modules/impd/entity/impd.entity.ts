import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'images' })
export class Impd {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    url: string;

    @ManyToOne(() => ProductEntity, product => product.impds)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
}