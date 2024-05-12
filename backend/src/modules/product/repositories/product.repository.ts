import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Product as ProductModel, Prisma } from '@prisma/client';

@Injectable()
export default class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Prisma.ProductCreateInput): Promise<ProductModel> {
    return this.prisma.product.create({ data: dto });
  }

  async findAll(): Promise<ProductModel[]> {
    return this.prisma.product.findMany({});
  }

  async findAllNotNullQuantity(): Promise<ProductModel[]> {
    return this.prisma.product.findMany({
      where: { quantity: { not: 0 } },
    });
  }

  async findAllByCategoryId(category_id: string): Promise<ProductModel[]> {
    return this.prisma.product.findMany({
      where: { quantity: { not: 0 }, category_id },
    });
  }

  async findById(id: string): Promise<ProductModel> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findAllByName(name: string): Promise<ProductModel[]> {
    return this.prisma.product.findMany({
      where: {
        quantity: { not: 0 },
        name: {
          contains: name.toLowerCase(),
        },
      },
    });
  }

  async findById1C(id: string): Promise<ProductModel> {
    console.log({ id });
    return this.prisma.product.findFirst({ where: { product_id_1C: id } });
  }

  async update(
    id: string,
    data: Prisma.ProductUpdateInput,
  ): Promise<ProductModel> {
    return this.prisma.product.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  async getWarehouseUpdDate(): Promise<ProductModel> {
    return this.prisma.product.findFirst({
      where: {
        quantity: { not: 0 },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
