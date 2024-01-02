import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //  UseInterceptors,
  //  UploadedFile,
  //  Header,
  //  StreamableFile,
  Query,
} from '@nestjs/common';
import { ProductService } from './service/product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import {
  /* ApiBody, ApiConsumes, */ ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
//import { FileInterceptor } from '@nestjs/platform-express';
//import { XLSService } from './service/xls.service';
import { SearchQueryDto } from './dto/search.query.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService, //private readonly xlsService: XLSService,
  ) {}

  /* @Get('get_pricelist')
  @Header('Content-Type', 'application/xlsx')
  @Header('Content-Disposition', 'attachment; filename="PriceList.xlsx"')
  async getStaticCSVFile(): Promise<StreamableFile> {
    return this.xlsService.getXlsPriceList();
  } */

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  //@UseGuards(JwtAuthGuard, RoleGuard)
  //@Roles(RolesEnum.USER)
  /* @Post('parse/xlsx')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    status: 200,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadUnitedXLSX(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return this.xlsService.uploadXLSFile(file);
  } */
}
