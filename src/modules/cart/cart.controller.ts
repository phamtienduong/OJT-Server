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
  @Post('add')
  async addToCart(@Body() body: CreateCartDto) {
    const { user_id, product_id } = body;
    return await this.cartService.addToCart(user_id, product_id);
  }
  @Get('list/:id')
  async listCart(@Param('id') id: number) {
    return await this.cartService.listCart(id);
  }
  @Put('update/incre')
  async updateQuantityIncre(@Body() body: UpdateCartDto) {
    return await this.cartService.updateQuantityIncre(body);
  }
  @Put('update/decre')
  async updateQuantityDecre(@Body() body: UpdateCartDto) {
    return await this.cartService.updateQuantityDecre(body);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.cartService.deleteCart(id);
  }
}
