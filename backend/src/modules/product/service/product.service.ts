import { Injectable, Logger, StreamableFile } from '@nestjs/common';
import { CreateProductDto } from '../dto/create.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import ProductRepository from '../repositories/product.repository';
import { CategoryService } from 'src/modules/category/service/category.service';
import ProductModel from '../model/product.model';
import * as xmlbuilder from 'xmlbuilder';
import { createReadStream, existsSync, mkdirSync, writeFile } from 'fs';
import { externalFilesConfig } from '../configs/files.config';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productRepo.create(dto);
  }

  async findAll() {
    return this.productRepo.findAll();
  }

  async findAllNotNullQuantity() {
    return this.productRepo.findAllNotNullQuantity();
  }

  async findOne(id: string) {
    return this.productRepo.findById(id);
  }

  async findAllByCategoryId(category_id: string) {
    return this.productRepo.findAllByCategoryId(category_id);
  }

  async update(id: string, dto: UpdateProductDto) {
    return this.productRepo.update(id, dto);
  }

  async remove(id: string) {
    return this.productRepo.delete(id);
  }

  async getById1c(id: number) {
    return this.productRepo.findById1C(id);
  }

  async productSearch(name: string) {
    return this.productRepo.findAllByName(name);
  }

  async getWarehouseUpdDate(): Promise<string> {
    const products = await this.productRepo.getWarehouseUpdDate();
    if (products?.length > 0) {
      return this.dateToString(products[0].updatedAt);
    } else {
      return this.dateToString(new Date());
    }
  }

  private dateToString(_date: string | Date): string {
    const date = new Date(_date);
    const day = date.getDate();
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }

  public compareProducts(
    prodXLS: CreateProductDto,
    prodDB: ProductModel,
  ): boolean {
    if (prodXLS.name !== prodDB.name) return false;
    if (prodXLS.tags !== prodDB.tags) return false;
    if (prodXLS.category_id !== prodDB.category_id) return false;
    if (prodXLS.description !== prodDB.description) return false;
    if (prodXLS.quantity !== prodDB.quantity) return false;
    if (prodXLS.price !== prodDB.price) return false;
    if (prodXLS?.images?.length !== prodDB?.images?.length) {
      return false;
    } else {
      for (const path of prodXLS.images) {
        const result = prodDB.images.find((el) => el === path);
        if (!result) return false;
      }
    }
    return true;
  }

  async updateSitemap(): Promise<void> {
    const lastMod = new Date().toJSON().slice(0, 10);
    const siteName = 'https://el-prom.com.ua';
    const urlset = xmlbuilder.create('urlset', {
      version: '1.0',
      encoding: 'UTF-8',
    });
    urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    urlset.ele('url').ele('loc', siteName).up().ele('lastmod', lastMod);
    urlset
      .ele('url')
      .ele('loc', siteName + '/delivery')
      .up()
      .ele('lastmod', lastMod);
    urlset
      .ele('url')
      .ele('loc', siteName + '/purchases')
      .up()
      .ele('lastmod', lastMod);
    urlset
      .ele('url')
      .ele('loc', siteName + '/contacts')
      .up()
      .ele('lastmod', lastMod);
    /* urlset
      .ele('url')
      .ele('loc', siteName + '/price.zip')
      .up()
      .ele('lastmod', lastMod); */
    urlset
      .ele('url')
      .ele('loc', siteName + '/categories/')
      .up()
      .ele('lastmod', lastMod);
    const categories = await this.categoryService.findAll();
    categories.forEach((cat) => {
      urlset
        .ele('url')
        .ele('loc', siteName + `/categories/${cat.id}`)
        .up()
        .ele('lastmod', lastMod);
    });
    const products = await this.findAll();
    products.forEach((prod) => {
      urlset
        .ele('url')
        .ele('loc', siteName + `/product-details/${prod.id}`)
        .up()
        .ele('lastmod', lastMod);
    });
    const sitemap = urlset.end({ pretty: true });
    writeFile(`${externalFilesConfig.path}sitemap.xml`, sitemap, (err) => {
      if (err) this.logger.log(err.message);
    });
    this.logger.log('Sitemap updated');
  }
  async getSitemap(): Promise<StreamableFile> {
    if (!existsSync(externalFilesConfig.path)) {
      mkdirSync(externalFilesConfig.path);
    }

    if (!existsSync(`${externalFilesConfig.path}sitemap.xml`)) {
      await this.updateSitemap();
    }

    const file = createReadStream(`${externalFilesConfig.path}sitemap.xml`);

    return new StreamableFile(file);
  }
}
