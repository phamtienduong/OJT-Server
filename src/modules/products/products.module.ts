import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { Impd } from '../impd/entity/impd.entity';
import { ImpdModule } from '../impd/impd.module';
import { AuthModule } from '../auth/auth.module';
// import { ImageProductEntity } from './entities/image-product.entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, Impd]),
    ImpdModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
