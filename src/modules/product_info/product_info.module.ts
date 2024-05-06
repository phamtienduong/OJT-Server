import { Module, forwardRef } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { ProductInfoController } from './product_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfoEntity } from './entities/product_info.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductEntity } from '../products/entities/product.entity';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInfoEntity,
      CategoryEntity,
      ProductEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
})
export class ProductInfoModule {}
