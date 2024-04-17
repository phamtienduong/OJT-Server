
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "category" })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    category_id: number;
    @Column()
    category_name: string;

    @OneToMany(()=>ProductEntity, (product)=>product.category_id)
    products: ProductEntity[]
}
