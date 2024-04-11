import { BillEntity } from "src/modules/bills/entities/bill.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "payment" })
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    payment_id: number;
    @Column()
    amount: number;
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    payment_date: Date;
    @Column()
    payment_method: string;
    
    @ManyToOne(() => BillEntity, (bill) => bill.payments)
    @JoinColumn({ name: "bill_id" })
    bill_id: BillEntity

}
