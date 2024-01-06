import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { XLSService } from './service/xls.service';
import { ProductService } from './service/product.service';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    private readonly xlsService: XLSService,
    private readonly productService: ProductService,
  ) {}

  @Get('pricelist')
  @Header('Content-Type', 'application/zip')
  @Header('Content-Disposition', 'attachment; filename="price.zip"')
  async getZipPrice(): Promise<StreamableFile> {
    return this.xlsService.getZipPrice();
  }

  @Get('sitemap')
  @Header('Content-Type', 'application/xml')
  @Header('Content-Disposition', 'attachment; filename="sitemap.xml"')
  async getSitemap(): Promise<StreamableFile> {
    return this.productService.getSitemap();
  }

  //@UseGuards(JwtAuthGuard, RoleGuard)
  //@Roles(RolesEnum.USER)
  @Post('parse/xlsx')
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
  }
}
