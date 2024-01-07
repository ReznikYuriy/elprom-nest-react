import { InjectQueue } from '@nestjs/bull';
import {
  ConflictException,
  Injectable,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { Queue } from 'bull';
import { CategoryService } from 'src/modules/category/service/category.service';
import * as xlsx from 'xlsx';
import { ProductService } from './product.service';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { externalFilesConfig } from '../configs/files.config';
import { ZipService } from './zip.service';

@Injectable()
export class XLSService {
  logger = new Logger(XLSService.name);
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly zipService: ZipService,
    @InjectQueue('product-queue')
    private queue: Queue,
  ) {}

  async uploadXLSFile(file: Express.Multer.File): Promise<any> {
    try {
      const wb = xlsx.read(file.buffer, { type: 'buffer' });
      const xlsxJson = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const categories = await this.categoryService.findAll();
      const categoriesMap: Map<string, string> = new Map<string, string>();
      for (const cat of categories) {
        categoriesMap.set(cat.name, cat.id);
      }

      for (let i = 0; i < xlsxJson.length; i++) {
        const category_id = categoriesMap.get(
          xlsxJson[i]['v_categories_name_1'],
        );
        if (category_id) {
          const productBody = this.prepareProductBody(xlsxJson[i], category_id);
          await this.queue.add(
            'upd-products-from-xlsx',
            { productBody },
            {
              removeOnComplete: true,
            },
          );
        } else {
          this.logger.debug('CATEGORY UNDEF');
        }
      }
    } catch (err: any) {
      this.logger.log(err.message);
    }

    //////////////////////////////////////////////////////////////////////////
  }
  private prepareProductBody = (xlsJson: any, category: string): any => {
    const imageFields = [
      'v_products_image',
      'v_products_image_med',
      'v_products_image_lrg',
      'v_products_image_sm_1',
      'v_products_image_xl_1',
      'v_products_image_sm_2',
      'v_products_image_xl_2',
      'v_products_image_sm_3',
      'v_products_image_xl_3',
      'v_products_image_sm_4',
      'v_products_image_xl_4',
      'v_products_image_sm_5',
      'v_products_image_xl_5',
      'v_products_image_sm_6',
      'v_products_image_xl_6',
    ];
    const imgArr = [];
    for (let i = 0; i < imageFields.length; i++) {
      const imgField = xlsJson[`${imageFields[i]}`].trim();
      if (imgField) {
        imgArr.push(imgField);
      }
    }

    return {
      name: xlsJson.v_products_name_1.trim(),
      tags: (xlsJson.v_products_head_keywords_tag_1 || '').trim(),
      category_id: category,
      images: imgArr,
      description: (xlsJson.v_products_description_1 || '').trim(),
      quantity: Number(xlsJson.v_products_quantity),
      price: Number(Number(xlsJson.v_products_price).toFixed(2)),
      product_id_1C: `${xlsJson.v_products_id}`,
    };
  };

  async createXlsxPricelist() {
    const categories = await this.categoryService.findAll();
    const products = await this.productService.findAllNotNullQuantity();
    if (categories?.length < 1 || products?.length < 1) {
      throw new ConflictException('Workbook is empty');
    }
    const workbook = xlsx.utils.book_new();
    for (const category of categories) {
      const catProducts = products
        .filter((pr) => pr.category_id === category.id)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((row) => ({
          name: row.name,
          quantity: row.quantity,
          price: row.price,
        }));
      if (catProducts?.length > 0) {
        /* generate worksheet and workbook */
        const worksheet = xlsx.utils.json_to_sheet(catProducts);

        xlsx.utils.book_append_sheet(workbook, worksheet, `${category.name}`);
        /* fix headers */
        xlsx.utils.sheet_add_aoa(
          worksheet,
          [['Наименование', 'Кол-во', 'Цена']],
          {
            origin: 'A1',
          },
        );
        /* calculate column width */
        const max_width = catProducts.reduce(
          (w, r) => Math.max(w, r.name.length),
          10,
        );
        worksheet['!cols'] = [{ wch: max_width }];
      }
    }

    /* create an XLSX file and try to save to Presidents.xlsx */

    if (!existsSync(externalFilesConfig.path)) {
      mkdirSync(externalFilesConfig.path);
    }
    xlsx.writeFile(
      workbook,
      `${externalFilesConfig.path}${externalFilesConfig.xlsx_name}`,
      { compression: true },
    );
    console.log('XLSX created');
  }

  async getXlsPriceList(): Promise<StreamableFile> {
    if (!existsSync(externalFilesConfig.path)) {
      mkdirSync(externalFilesConfig.path);
    }

    if (
      !existsSync(`${externalFilesConfig.path}${externalFilesConfig.xlsx_name}`)
    ) {
      await this.createXlsxPricelist();
    }

    const file = createReadStream(
      `${externalFilesConfig.path}${externalFilesConfig.xlsx_name}`,
    );

    return new StreamableFile(file);
  }

  async getZipPrice(): Promise<StreamableFile> {
    if (!existsSync(externalFilesConfig.path)) {
      mkdirSync(externalFilesConfig.path);
    }

    if (
      !existsSync(
        `${externalFilesConfig.path}${externalFilesConfig.archive_name}`,
      )
    ) {
      await this.createZipPrice();
    }

    const file = createReadStream(
      `${externalFilesConfig.path}${externalFilesConfig.archive_name}`,
    );

    return new StreamableFile(file);
  }

  async createZipPrice(): Promise<any> {
    if (!existsSync(externalFilesConfig.path)) {
      mkdirSync(externalFilesConfig.path);
    }

    if (
      !existsSync(`${externalFilesConfig.path}${externalFilesConfig.xlsx_name}`)
    ) {
      await this.createXlsxPricelist();
    }
    await this.zipService.createZipArchive();
    console.log('ZIP created');
  }
}
