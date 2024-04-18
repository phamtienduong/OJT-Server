import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  status: number;
  cart_id: number;
  user_id: number;
}
