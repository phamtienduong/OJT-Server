import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { CreateProductInfoDto } from './dto/create-product_info.dto';
import { UpdateProductInfoDto } from './dto/update-product_info.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('api/v1/product-info/')
export class ProductInfoController {
  constructor(private readonly productInfoService: ProductInfoService) {}

  @Get("product-info-list")
  getAll() {
    return this.productInfoService.getAll();
  }
  
  @Get("/:id")
  @ApiParam({ name: 'id', description: 'Product ID' })
  getOne(@Param() param: string) {
    return this.productInfoService.getOne(param);
  }

  @Post("/create/:id")
  @ApiParam({ name: 'id', description: 'Product ID' })
  createDetail(@Body() body: CreateProductInfoDto, @Param() param: string) {
    return this.productInfoService.createDetail(body, param);
  }

  @Patch("/update/:id/:id2")
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'id2', description: 'Product info ID' })
  updateDetail(@Body() body: UpdateProductInfoDto, @Param("id") param: string, @Param("id2") param2: string) {
    // console.log(body, param, param2)
    return this.productInfoService.updateDetail(body, param,param2);
  }

  @Delete("/delete/:id/:id2")
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'id2', description: 'Product info ID' })
  deleteDetail(@Param("id") param: string, @Param("id2") param2: string) {
    return this.productInfoService.deleteDetail(param,param2);
  }
}