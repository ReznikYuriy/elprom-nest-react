import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';
import { Category as CategoryModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export default class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<CategoryModel> {
    return this.prisma.category.create({ data });
  }

  async findAll(): Promise<Partial<CategoryModel>[]> {
    return this.prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  }

  async findAllNonZeroBalances(): Promise<CategoryModel[]> {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        products: {
          where: {
            quantity: { gt: 0 },
          },
        },
      },
    });
  }

  async findById(id: string): Promise<CategoryModel> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryModel> {
    const cat = await this.prisma.category.update({
      where: { id },
      data: { ...data },
    });
    return cat;
  }

  async delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
