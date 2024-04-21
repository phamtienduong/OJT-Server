import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteProductService } from './favorite_product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite_product.dto';

@Controller('api/v1/favorite-products')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post('/add')
  addFavorite(@Body() addFavoriteProductDto: CreateFavoriteProductDto) {
    const { user_id, product_id } = addFavoriteProductDto;
    console.log(user_id, product_id);

    this.favoriteProductService.addFavoriteProduct(+user_id, +product_id);
    return {
      message: 'Add favorite products successfully',
    };
  }

  @Get(':id')
  getAll(@Param('id') id: string) {
    return this.favoriteProductService.getAllFavor(+id);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number, @Body() product_id: number) {
    const result = await this.favoriteProductService.removeFavorite(
      id,
      product_id,
    );
    return {
      message: 'Delete favorite products successfully',
      data: result,
    };
  }
}
