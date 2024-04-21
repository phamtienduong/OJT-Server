import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>) { }
  async createReview( createReviewDto: CreateReviewDto) {
    try {
      const newComment = await this.reviewRepository.createQueryBuilder('reviews')
      .insert()
      .into(ReviewEntity)
      .values({
        content : createReviewDto.content,
        rating: createReviewDto.rating,
        product_id: { product_id: createReviewDto.product_id },
        user_id: { user_id: createReviewDto.user_id }
      })
      .execute();
    return newComment;
    } catch (error) {
      return null
    }
  }

  async reviewsInOneProduct(id: number, page: number) {
    return this.reviewRepository.createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.user_id', 'user')
      .leftJoinAndSelect('reviews.product_id', 'product')
      .where('product.product_id = :id', { id })
      .orderBy("reviews.review_date", "DESC")
      .getMany();
  }

  
  updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.createQueryBuilder('review')
      .update(ReviewEntity)
      .set({
        ...updateReviewDto,
        review_date: () => "CURRENT_TIMESTAMP"
      })
      .where('review.review_id = :id', { id })
      .execute();
  }

  deleteReview(id: number) {
    return this.reviewRepository.createQueryBuilder('review')
      .delete()
      .from(ReviewEntity)
      .where('review.review_id = :id', { id })
      .execute()
  }

  async getAvgRatingProductDetail(id: number) {
    const AvgRating = await this.reviewRepository
      .createQueryBuilder()
      .select('AVG(rating)', '')
      .where('product_id = :product_id', { product_id: id })
      .getRawOne();
      // console.log(AvgRating)
    return AvgRating
  }
}
