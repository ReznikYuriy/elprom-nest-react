import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './category.controller';
import CategoryModel from './model/category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import CategoryRepository from './repositories/category.repository';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
