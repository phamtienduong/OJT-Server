import { BillStatus } from "src/constant/enum";
import { AddressEntity } from "src/modules/address/entities/address.entity";
import { BillDetailEntity } from "src/modules/bill_detail/entities/bill_detail.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bills" })
export class BillEntity {
    @PrimaryGeneratedColumn()
    bill_id: number;
    @Column({
        type: "enum",
        enum:BillStatus,
        default:BillStatus.PENDING})
    status: string;
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    bill_date: Date;
    @Column()
    total_price: number;
    @Column()
    phone: string;

    @ManyToOne(()=>UserEntity, (user)=>user.bills)
    @JoinColumn({name:"user_id"})
    user_id: UserEntity

    @OneToOne(() => BillDetailEntity, (bill_detail) => bill_detail.bill_id)
    bill_details: BillDetailEntity[]

    @OneToMany(()=>PaymentEntity, (payment)=>payment.bill_id)
    payments : PaymentEntity[];

    @ManyToOne(()=>AddressEntity, (address)=>address.bill)
    @JoinColumn({name:"address_id"})
    address_id: AddressEntity
}
