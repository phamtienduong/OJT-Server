import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('api/v1/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }
  @Post('product/:id')
  createNewReview(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(+id, createReviewDto);
  }

  @Get('product/:id')
  async getReviewsByProduct(@Param('id') id: string, @Query('page') page: string) {
    try {
      let res = await this.reviewService.reviewsInOneProduct(+id, +page);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      await this.reviewService.updateReview(+id, updateReviewDto);
      return {
        message: 'update review thanh cong'
      }
    } catch (err) {
      console.log(err)
    }
    
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    try {
      await this.reviewService.deleteReview(+id)
      return {
        message: 'xóa review'
      };
    } catch (err) {
      console.log(err)
    }
  }
}
