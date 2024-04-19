import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('/cart-list')
  getAll() {
    return this.cartService.getAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  getOne(@Param() param: string) {
    return this.cartService.getOne(param);
  }

  @Post()
  @ApiBody({ type: CreateCartDto })
  addToCart(@Body() body: CreateCartDto) {
    // console.log(body)
    return this.cartService.addToCart(body);
  }

  @Put('/update/:id')
  @ApiBody({ type: UpdateCartDto })
  @ApiParam({ name: 'id', description: 'User ID' })
  updateCart(@Body() body: UpdateCartDto, @Param() param: string) {
    return this.cartService.updateCart(body, param);
  }

  @Delete('/delete/:id')
  @ApiBody({ type: UpdateCartDto })
  @ApiParam({ name: 'id', description: 'User ID' })
  deleteCart(@Body() body: UpdateCartDto, @Param() param: string) {
    return this.cartService.deleteCart(body,param);
  }
}
