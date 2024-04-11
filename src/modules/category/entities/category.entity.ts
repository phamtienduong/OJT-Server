import { ProductInfoEntity } from "src/modules/product_info/entities/product_info.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "category" })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    category_id: number;
    @Column()
    category_name: string;

    @OneToMany(()=>ProductInfoEntity, (product_info)=>product_info.category_id)
    product_info: ProductInfoEntity[]
}
