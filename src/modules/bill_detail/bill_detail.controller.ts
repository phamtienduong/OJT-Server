import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';

@Controller('bill-detail')
export class BillDetailController {
  constructor(private readonly billDetailService: BillDetailService) {}

  @Post()
  create(@Body() createBillDetailDto: CreateBillDetailDto) {
    return this.billDetailService.create(createBillDetailDto);
  }

  @Get()
  findAll() {
    return this.billDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDetailDto: UpdateBillDetailDto) {
    return this.billDetailService.update(+id, updateBillDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billDetailService.remove(+id);
  }
}
