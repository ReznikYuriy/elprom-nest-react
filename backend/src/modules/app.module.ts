import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './product/product.module';
import CategoryModel from './category/model/category.model';
import configs from 'src/configs';
import ProductModel from './product/model/product.model';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import UserModel from './user/model/user.schema';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...configs.postgres,
      dialect: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      models: [CategoryModel, ProductModel, UserModel],
    }),
    BullModule.forRoot({
      redis: {
        host: configs.redis.host,
        port: Number(configs.redis.port),
      },
    }),
    CategoryModule,
    ProductModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
