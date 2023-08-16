import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CategoryModel from '../model/category.model';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';

@Injectable()
export default class CategoryRepository {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categorySchema: typeof CategoryModel,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryModel> {
    return this.categorySchema.create(dto);
  }

  async findAll(): Promise<CategoryModel[]> {
    return this.categorySchema.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });
  }

  async findById(id: string): Promise<CategoryModel> {
    return this.categorySchema.findByPk(id);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryModel> {
    const [, [updReq]] = await this.categorySchema.update(
      { ...data },
      { where: { id }, returning: true },
    );
    return updReq;
  }

  async delete(id: string) {
    return this.categorySchema.destroy({ where: { id } });
  }
}
