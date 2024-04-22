import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('api/v1/bill-detail')
export class BillDetailController {
  constructor(private readonly billDetailService: BillDetailService) {}

  @Get()
  getAll() {
    return this.billDetailService.findAll();
  }

  @Patch("/admin_change/:id")
  @ApiParam({ name: "id", description: "Bill ID" })
  changeStatusbyAdmin(@Param("id") param:any, @Body() body:UpdateBillDetailDto) {
    return this.billDetailService.changeStatusbyAdmin(param, body);

  }

  @Get("/:id")
  @ApiParam({ name: "id", description: "User ID" })
  getBillsByUser(@Param("id") id: any) {
    return this.billDetailService.getBillsByUser(id);
  }

  @Patch("/:id1/:id2")
  changeStatusbyUser(@Param("id1") id1: any, @Param("id2") id2: any, @Body() body: UpdateBillDetailDto) {
    return this.billDetailService.changeStatusbyUser(id1, id2, body);
  }
}
