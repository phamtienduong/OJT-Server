import { Injectable } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from '../bills/entities/bill.entity';
import { Repository } from 'typeorm';
import { BillDetailEntity } from './entities/bill_detail.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class BillDetailService {
  constructor(
    @InjectRepository(BillDetailEntity)
    private readonly billDetailRepository: Repository<BillDetailEntity>,
    @InjectRepository(BillEntity)
    private readonly billRepository: Repository<BillEntity>,
    @InjectRepository(BillEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  findAll() {
    const bill_detail = this.billRepository
      .createQueryBuilder('bills')
      .getMany();
    return bill_detail;
  }

  async changeStatusbyAdmin(param: any, body: UpdateBillDetailDto) {
    // console.log(param);
    // console.log(body);
    try {
      const bill_id = param;
      const result = await this.billRepository
        .createQueryBuilder('bills')
        .update(BillEntity)
        .set({ status: body.status })
        .where('bill_id = :bill_id', { bill_id })
        .execute();
    } catch (error) {
      console.log(error);
    }
  }

  async getBillsByUser(id: any) {
    console.log(id);
    try {
      const result = await this.billRepository
        .createQueryBuilder('bills')
        .where('bills.user_id = :user_id', { user_id: id })
        .getMany();

        // console.log(result)
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatusbyUser(id1:any, id2:any, body:any){
    try {
      const user_id = id1;
      const bill_id = id2;
      const status = body.status;
      // console.log(bill_id, user_id, body.status);
      const result = await this.billRepository
        .createQueryBuilder('bills')
        .update(BillEntity)
        .set({ status })
        .where('bill_id = :bill_id', { bill_id })
        .andWhere('user_id = :user_id', { user_id })
        .execute();
      return {message:"Hủy thành công"};
    } catch (error) {
      console.log(error)
    }
  }
}
