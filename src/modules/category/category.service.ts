import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(body: CreateCategoryDto) {
    try {
      const newCate = this.categoryRepository.create(body);
      const result = await this.categoryRepository
        .createQueryBuilder('category')
        .insert()
        .into(CategoryEntity)
        .values(newCate)
        .execute();

      if (result.raw.affectedRows) {
        return { message: 'Thêm cate vào thành công' };
      } else {
        return { message: 'Không thành công' };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    const qb = this.categoryRepository.createQueryBuilder('category');
    const category = await qb.getMany();
    return category;
  }

  async updateCate(body: UpdateCategoryDto, param: any) {
    try {
      // console.log(param.id);
      await this.categoryRepository
        .createQueryBuilder()
        .update(CategoryEntity)
        .set(body)
        .where('category_id = :id', { id: param.id })
        .execute();
      return { message: 'Cập nhật thành công' };
    } catch (error) {
      return { message: 'Lỗi rồi' };
    }
  }

  async deleteCate(param: any) {
    console.log(param);
    try {
     const result= await this.categoryRepository
        .createQueryBuilder()
        .delete()
        .from(CategoryEntity)
        .where('category_id = :id', { id: param.id })
        .execute();
        console.log(result);
        
        if (result.affected > 0) {
          return { message: 'Xóa cate thành công' };
        } else {
          return {
            message: 'Không có hàng nào bị xóa',
          };
        }
    } catch (error) {
      return { message: 'Lỗi rồi' };
    }
  }
}
