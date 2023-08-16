import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SequelizeModule } from '@nestjs/sequelize';
import CategoryModel from './category/model/category.model';
import configs from 'src/configs';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...configs.postgres,
      dialect: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      models: [CategoryModel],
    }),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
