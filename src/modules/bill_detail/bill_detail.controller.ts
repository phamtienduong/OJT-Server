import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guards';

@Controller('api/v1/bill-detail')
export class BillDetailController {
  constructor(private readonly billDetailService: BillDetailService) {}

  @Get()
  @SetMetadata('role', 'admin')
  @UseGuards(AuthGuard)
  getAll() {
    return this.billDetailService.findAll();
  }

  @Patch('/admin_change/:id')
  @ApiParam({ name: 'id', description: 'Bill ID' })
  changeStatusbyAdmin(
    @Param('id') param: any,
    @Body() body: UpdateBillDetailDto,
  ) {
    return this.billDetailService.changeStatusbyAdmin(param, body);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  getBillsByUser(@Param('id') id: any) {
    return this.billDetailService.getBillsByUser(id);
  }

  @Patch('/:id1/:id2')
  changeStatusbyUser(
    @Param('id1') id1: any,
    @Param('id2') id2: any,
    @Body() body: UpdateBillDetailDto,
  ) {
    return this.billDetailService.changeStatusbyUser(id1, id2, body);
  }

  @Post('/payment/:id1/:id2')
  async createPayment(@Param("id1") param1:any, @Param("id2") param2:any, @Body() body:any): Promise<any> {
    // console.log(param, body)
    try {
      const paymentResult = await this.billDetailService.createPayment(param1, param2,body);
      return { success: true, data: paymentResult };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('/callback')
  async handleCallback(@Body() req:any): Promise<any> {
    // console.log(req,"reqqqqqqqqqqqqqqqqqqqqqqq")
    try {
      const callbackResult = await this.billDetailService.handleCallback(req);
      return { success: true, data: callbackResult };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('/check-status-order/:app_trans_id')
  async checkStatusOrder(
    @Param('app_trans_id') appTransId: any,
  ): Promise<any> {
    // console.log(appTransId)
    try {
      const statusResult =
        await this.billDetailService.checkStatusOrder(appTransId);
      return { success: true, data: statusResult };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Patch('/update/:id')
  updateStock(@Body() body:any, @Param() param:any){
    return this.billDetailService.updateStock(body, param);
  }
}
