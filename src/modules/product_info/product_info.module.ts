import { Module } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { ProductInfoController } from './product_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfoEntity } from './entities/product_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfoEntity])],
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
})
export class ProductInfoModule {}
