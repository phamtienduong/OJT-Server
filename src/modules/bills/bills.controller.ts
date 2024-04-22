import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('api/v1/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post("check-out/:id")
  createBill(@Body() body: any, @Param('id') id: any) {
    console.log(body.fullname)
    return this.billsService.createBill(body,id);
  }
}
