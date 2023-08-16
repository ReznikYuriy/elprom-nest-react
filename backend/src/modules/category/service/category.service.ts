import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';
import CategoryRepository from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    return this.categoryRepo.create(dto);
  }

  async findAll() {
    return this.categoryRepo.findAll();
  }

  async findOne(id: string) {
    return this.categoryRepo.findById(id);
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.update(id, dto);
  }

  remove(id: string) {
    return this.remove(id);
  }
}
