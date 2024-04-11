import { Module } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { BillDetailController } from './bill_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillDetailEntity } from './entities/bill_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillDetailEntity])],
  controllers: [BillDetailController],
  providers: [BillDetailService],
})
export class BillDetailModule {}
