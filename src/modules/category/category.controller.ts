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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guards';

@Controller('/api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Get('get-list')
  @SetMetadata('role', 'admin')
  @UseGuards(AuthGuard)
  getAll() {
    return this.categoryService.getAll();
  }

  @Patch('/update/:id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  updateCate(@Body() body: UpdateCategoryDto, @Param() param: string) {
    return this.categoryService.updateCate(body, param);
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  deleteCate(@Param() param: string) {
    return this.categoryService.deleteCate(param);
  }
}
