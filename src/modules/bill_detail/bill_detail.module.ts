import { Module } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { BillDetailController } from './bill_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillDetailEntity } from './entities/bill_detail.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { BillEntity } from '../bills/entities/bill.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillDetailEntity, BillEntity, ProductEntity]),
    AuthModule,
  ],
  controllers: [BillDetailController],
  providers: [BillDetailService],
})
export class BillDetailModule {}
