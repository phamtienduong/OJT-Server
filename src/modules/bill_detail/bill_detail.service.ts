import { Injectable } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from '../bills/entities/bill.entity';
import { Repository } from 'typeorm';
import { BillDetailEntity } from './entities/bill_detail.entity';
import { ProductEntity } from '../products/entities/product.entity';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import * as qs from 'qs';
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
@Injectable()
export class BillDetailService {
  constructor(
    @InjectRepository(BillDetailEntity)
    private readonly billDetailRepository: Repository<BillDetailEntity>,
    @InjectRepository(BillEntity)
    private readonly billRepository: Repository<BillEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  private readonly config = {
    app_id: '2554',
    key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
    key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  };
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
    // console.log(id);
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

  async changeStatusbyUser(id1: any, id2: any, body: any) {
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
      return { message: 'Hủy thành công' };
    } catch (error) {
      console.log(error);
    }
  }
  async updateStock(param: any, body: any) {
    console.log(param,body)
  }
  //
  async createPayment(param1: any, param2: any, body: any): Promise<any> {
    // console.log(param1, param2);
    const user_id = param1;
    const bill_id = param2;
    const infoBills = body.record;
    // console.log(infoBills);
    const embed_data = {
      //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
      redirecturl: 'https://google.com',
    };

    const items = [
      {
        user_id,
        bill_id,
      },
    ];
    const transID = Math.floor(Math.random() * 1000000);

    const order = {
      app_id: this.config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: 'user123',
      user_id: user_id,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: infoBills.total_price,
      //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
      //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
      callback_url:
        'https://8695-42-113-145-249.ngrok-free.app/api/v1/bill-detail/callback',
      description: `Hóa đơn của ${infoBills.fullname},\n số điện thoại ${infoBills.phone},\n ngày mua ${infoBills.bill_date},\n địa chỉ ${infoBills.address}`,
      bank_code: '',
      mac: '',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      this.config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();
    //  console.log(order);
    try {
      // console.log({
      //     params: order,
      // });
      const result = await axios.post(this.config.endpoint, null, {
        params: order,
      });
      const app_trans_id = order.app_trans_id;

      return {
        ...result.data,
        app_trans_id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async handleCallback(data: any): Promise<any> {
    let result: any = {};
    // console.log(data)
    try {
      const dataStr = data.data;
      const reqMac = data.mac;

      const mac = CryptoJS.HmacSHA256(dataStr, this.config.key2).toString();

      // Kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // Callback không hợp lệ
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        // Thanh toán thành công
        // Merchant cập nhật trạng thái cho đơn hàng ở đây
        const dataJson = JSON.parse(dataStr);
        // console.log(
        //   "update order's status = success where app_trans_id =",
        //   dataJson['app_trans_id'],
        // );
        // console.log(dataJson);
        const dataUser = JSON.parse(dataJson.item);
        const user_id = dataUser[0].user_id;
        const bill_id = dataUser[0].bill_id;
        // console.log(user_id, bill_id);
        const body = {
          status: 'paid',
        };
        const reso = await this.changeStatusbyUser(user_id, bill_id, body);
        // console.log(reso)
        result.return_code = 1;
        result.return_message = 'success';
      }
    } catch (ex) {
      console.log('lỗi:::' + ex.message);
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }

    return result;
  }

  async checkStatusOrder(appTransId: string): Promise<any> {
    const postData = {
      app_id: this.config.app_id,
      app_trans_id: appTransId,
      mac: '',
    };

    const data =
      postData.app_id + '|' + postData.app_trans_id + '|' + this.config.key1;
    postData.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();

    const postConfig = {
      method: 'post',
      url: 'https://sb-openapi.zalopay.vn/v2/query',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(postData),
    };

    try {
      const result = await axios(postConfig);
      // console.log(result.data)
      return result.data;
    } catch (error) {
      console.log('lỗi');
      console.log(error);
    }
  }
}
