import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Header,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { XLSService } from './service/xls.service';
import { ProductService } from './service/product.service';
import { RolesEnum } from '../user/enums/user.role';
import { Roles } from '../auth/guards/roles.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.ADMIN)
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
