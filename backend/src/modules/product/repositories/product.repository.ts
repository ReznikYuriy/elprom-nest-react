import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ProductModel from '../model/product.model';
import { CreateProductDto } from '../dto/create.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import { Op } from 'sequelize';

@Injectable()
export default class ProductRepository {
  constructor(
    @InjectModel(ProductModel)
    private readonly productSchema: typeof ProductModel,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductModel> {
    return this.productSchema.create(dto);
  }

  async findAll(): Promise<ProductModel[]> {
    return this.productSchema.findAll();
  }

  async findAllNotNullQuantity(): Promise<ProductModel[]> {
    return this.productSchema.findAll({
      where: { quantity: { [Op.ne]: 0 } },
    });
  }

  async findAllByCategoryId(category_id: string): Promise<ProductModel[]> {
    return this.productSchema.findAll({
      where: { quantity: { [Op.ne]: 0 }, category_id },
    });
  }

  async findById(id: string): Promise<ProductModel> {
    return this.productSchema.findByPk(id);
  }

  async findAllByName(name: string): Promise<ProductModel[]> {
    return this.productSchema.findAll({
      where: {
        quantity: { [Op.ne]: 0 },
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }

  async findById1C(id: string): Promise<ProductModel> {
    console.log({ id });
    return this.productSchema.findOne({ where: { product_id_1C: `${id}` } });
  }

  async update(id: string, data: UpdateProductDto): Promise<ProductModel> {
    const [, [updReq]] = await this.productSchema.update(
      { ...data },
      { where: { id }, returning: true },
    );
    return updReq;
  }

  async delete(id: string) {
    return this.productSchema.destroy({ where: { id } });
  }

  async getWarehouseUpdDate(): Promise<ProductModel[]> {
    return this.productSchema.findAll({
      where: {
        quantity: { [Op.ne]: 0 },
      },
      attributes: ['updatedAt'],
      order: [['updatedAt', 'DESC']],
      limit: 1,
    });
  }
}
