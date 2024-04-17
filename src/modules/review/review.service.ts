import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>) { }
  async createReview(id: number, createReviewDto: CreateReviewDto) {
    const { user_id } = createReviewDto;
    return await this.reviewRepository.createQueryBuilder('review')
      .insert()
      .into(ReviewEntity)
      .values({
        ...createReviewDto,
        user_id: user_id as any,
        product_id: id as any,
      })
      .execute()
  }

  async reviewsInOneProduct(id: number, page: number) {
    let limit = 5;
    let skip = (page - 1) * limit;
    return this.reviewRepository.createQueryBuilder('review')
      .leftJoinAndSelect('review.product_id', 'product')
      .leftJoinAndSelect('review.user_id', 'user')
      .orderBy('review.review_id', 'DESC')
      .where('product.product_id = :id', { id })
      .skip(skip)
      .take(limit)
      .getMany()
  }

  reviewsByUser() {

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
}
