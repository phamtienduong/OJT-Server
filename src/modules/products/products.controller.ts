import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/create")
  createProduct(@Body() body: CreateProductDto) {
    // console.log(body);
    return this.productsService.createProduct(body);
  }

  @Get("get-list")
  getAll() {
    return this.productsService.getAll();
  }

  @Patch('/update/:id')
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  updateProducts(@Body() body: UpdateProductDto, @Param() param: string) {
    return this.productsService.updateProducts(body, param);
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', description: 'Product ID' })
  deleteProduct(@Param() param: string) {
    return this.productsService.deleteProduct(param);
  }
}
