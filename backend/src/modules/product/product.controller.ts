import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './service/product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchQueryDto } from './dto/search.query.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesEnum } from '../user/enums/user.role';
import { Roles } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  async create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id/product')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get(':category_id/category')
  async findOneByCategoryId(@Param('category_id') category_id: string) {
    return this.productService.findAllByCategoryId(category_id);
  }

  @ApiOkResponse({
    type: Array,
  })
  @Get('search')
  async productsSearch(@Query() query: SearchQueryDto) {
    return await this.productService.productSearch(query.name);
  }

  @ApiOkResponse({
    type: String,
  })
  @Get('warehouse-upd-date')
  async getWarehouseUpdDate(): Promise<string> {
    return await this.productService.getWarehouseUpdDate();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
