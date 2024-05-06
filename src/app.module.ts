import { CategoryEntity } from './modules/category/entities/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CategoryModule } from './modules/category/category.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductInfoModule } from './modules/product_info/product_info.module';
import { CartModule } from './modules/cart/cart.module';
import { FavoriteProductModule } from './modules/favorite_product/favorite_product.module';
import { AddressModule } from './modules/address/address.module';
import { ReviewModule } from './modules/review/review.module';
import { BillsModule } from './modules/bills/bills.module';
import { BillDetailModule } from './modules/bill_detail/bill_detail.module';
import { UserEntity } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AddressEntity } from './modules/address/entities/address.entity';
import { ProductEntity } from './modules/products/entities/product.entity';
import { ProductInfoEntity } from './modules/product_info/entities/product_info.entity';
import { CartEntity } from './modules/cart/entities/cart.entity';
import { BillEntity } from './modules/bills/entities/bill.entity';
import { BillDetailEntity } from './modules/bill_detail/entities/bill_detail.entity';
import { ReviewEntity } from './modules/review/entities/review.entity';
import { FavoriteProductEntity } from './modules/favorite_product/entities/favorite_product.entity';
import { AuthModule } from './modules/auth/auth.module';
import { Impd } from './modules/impd/entity/impd.entity';
import { ImpdModule } from './modules/impd/impd.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'corsair_database',
      entities: [
        UserEntity,
        AddressEntity,
        CategoryEntity,
        ProductEntity,
        ProductInfoEntity,
        CartEntity,
        BillEntity,
        BillDetailEntity,
        ReviewEntity,
        FavoriteProductEntity,
        Impd,
      ],
      synchronize: true,
    }),
    CategoryModule,
    UsersModule,
    ProductsModule,
    ProductInfoModule,
    CartModule,
    FavoriteProductModule,
    AddressModule,
    ReviewModule,
    BillsModule,
    BillDetailModule,
    AuthModule,
    MailerModule.forRoot({
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.AUTH_USER_EMAIL,
          pass: process.env.AUTH_USER_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
