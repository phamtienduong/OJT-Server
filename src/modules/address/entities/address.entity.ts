import { BillEntity } from "src/modules/bills/entities/bill.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "address" })
export class AddressEntity {
    @PrimaryGeneratedColumn()
    address_id: number;
    @Column()
    ward: string;
    @Column()
    district: string;
    @Column()
    city: string;
    
    @ManyToOne(() => UserEntity, (user) => user.address)
    @JoinColumn({ name: "user_id" })
    user_id: UserEntity;

    @OneToMany(()=>BillEntity,(bill)=>bill.address_id)
    bill:BillEntity[]
}
