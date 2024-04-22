import { PartialType } from '@nestjs/swagger';
import { CreateBillDetailDto } from './create-bill_detail.dto';

export class UpdateBillDetailDto extends PartialType(CreateBillDetailDto) {
    status:string
}
