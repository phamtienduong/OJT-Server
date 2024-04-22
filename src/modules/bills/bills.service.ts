import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillEntity)
    private readonly billRepository: Repository<BillEntity>,
  ) {}
  async createBill(body: any, id: any) {
    // console.log(body)
    // console.log(id)
    const { total_price, phone, receiver_email,fullname } = body;
    console.log(fullname)
    const addressInfo = body.address;
    try {
      const newBill = this.billRepository.create({
        total_price,
        phone,
        receiver_email,
        user_id: id,
        address: addressInfo,
        fullname,
      });
      const result = await this.billRepository
        .createQueryBuilder()
        .insert()
        .into(BillEntity)
        .values(newBill)
        .execute();
      return result;
    } catch (error) {
      console.log(error)
    }
  }
}
