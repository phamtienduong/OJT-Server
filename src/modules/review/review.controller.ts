import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('api/v1/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post("create")
  async createComment(@Body() createReviewDto: CreateReviewDto) {
    const result = await this.reviewService.createReview(createReviewDto);

    if (!result) {
      throw new BadRequestException("No create review")
    }

    return {
      statusCode: 200,
      message: 'Create review success',
      data: result
    }
  }


  @Get('avg-start/:id')
  async avgStar(@Param('id', ParseIntPipe) id: number) {
    const result = await this.reviewService.getAvgRatingProductDetail(id);

    return {
      statusCode: 200,
      message: "get avg rating oke",
      data: result
    }
  }


  // @Get()
  // findAll() {
  //   return this.reviewService.findAll();


  // }

  @Get('listReview/:id')
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
