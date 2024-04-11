import { BillEntity } from "src/modules/bills/entities/bill.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bill_detail' })
export class BillDetailEntity {
    @PrimaryGeneratedColumn()
    bill_detail_id: number;
    @Column()
    quantity: number;

    @ManyToOne(()=>ProductEntity, (product)=>product.bill_details)
    @JoinColumn({name: 'product_id'})
    product_id: ProductEntity;

    @OneToOne(()=>BillEntity, (bill)=>bill.bill_details)
    @JoinColumn({name: 'bill_id'})
    bill_id: BillEntity
}
