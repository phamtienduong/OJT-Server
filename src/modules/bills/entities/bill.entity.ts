import { BillStatus } from 'src/constant/enum';
import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { BillDetailEntity } from 'src/modules/bill_detail/entities/bill_detail.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bills' })
export class BillEntity {
  @PrimaryGeneratedColumn()
  bill_id: number;
  @Column({
    type: 'enum',
    enum: BillStatus,
    default: BillStatus.UNPAID,
  })
  status: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  bill_date: Date;

  @Column()
  receiver_email: string;
  @Column()
  total_price: number;
  @Column()
  phone: string;
  @Column()
  fullname: string;
  @Column()
  address: string;
  @ManyToOne(() => UserEntity, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity;

  @OneToOne(() => BillDetailEntity, (bill_detail) => bill_detail.bill_id)
  bill_details: BillDetailEntity[];
}
