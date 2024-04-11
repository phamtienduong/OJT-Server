import { Injectable } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';

@Injectable()
export class BillDetailService {
  create(createBillDetailDto: CreateBillDetailDto) {
    return 'This action adds a new billDetail';
  }

  findAll() {
    return `This action returns all billDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billDetail`;
  }

  update(id: number, updateBillDetailDto: UpdateBillDetailDto) {
    return `This action updates a #${id} billDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} billDetail`;
  }
}
