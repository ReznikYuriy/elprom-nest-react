import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { ProductService } from './product.service';
import { Product as ProductModel } from '@prisma/client';
import { XLSService } from './xls.service';
import productIdCreator from '../helper/create.id';

@Injectable()
@Processor('product-queue')
export class ProductQueueProcessor {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly productService: ProductService,
    private readonly xlsService: XLSService,

    @InjectQueue('product-queue')
    private queue: Queue,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}.`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    this.logger.error(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
    throw error;
  }

  @Process('upd-products-from-xlsx')
  async updProductsFromXlsx(job: Job<{ productBody: ProductModel }>) {
    this.logger.log(`Processor:@Process - Update Db from XLSX file.`);
    const dto = {
      ...job.data.productBody,
      discounts: [],
    };
    const { category_id, ..._dto } = dto;
    try {
      const prodInDb = await this.productService.getById1c(dto.product_id_1C);
      if (!prodInDb) {
        await this.productService.create({
          ..._dto,
          id: productIdCreator(
            job.data.productBody.name,
            +job.data.productBody.product_id_1C,
          ),
          discounts: [],
          category: { connect: { id: category_id } },
        });
      } else if (!this.productService.compareProducts(dto, prodInDb)) {
        await this.productService.update(prodInDb.id, dto);
        this.logger.verbose(dto);
      }
      const queue_count = await this.queue.count();
      if (!queue_count) {
        await this.productService.updateSitemap();
        await this.xlsService.createXlsxPricelist();
        await this.xlsService.createZipPrice();
      }
    } catch (error) {
      this.logger.error('Bad DB request.', error.stack);
    }
  }
}
