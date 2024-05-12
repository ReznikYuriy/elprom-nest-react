import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './category.controller';
import CategoryRepository from './repositories/category.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
