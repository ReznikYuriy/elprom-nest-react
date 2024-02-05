import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/guards/roles.guard';
import { RolesEnum } from '../user/enums/user.role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({
    status: 201,
    type: CreateCategoryDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOkResponse({
    status: 200,
    type: [CreateCategoryDto],
  })
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    type: [CreateCategoryDto],
  })
  @Get('non-zero-balance')
  async findAllNonZeroBalances() {
    return this.categoryService.findAllNonZeroBalances();
  }

  @ApiOkResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOkResponse({
    status: 200,
    type: CreateCategoryDto,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOkResponse({
    status: 200,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
