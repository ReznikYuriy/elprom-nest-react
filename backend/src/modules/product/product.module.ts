import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './product.controller';
import ProductRepository from './repositories/product.repository';
import { CategoryModule } from '../category/category.module';
import configs from 'src/configs';
import { BullModule } from '@nestjs/bull';
import { ProductQueueProcessor } from './service/product.queue.processor';
import { XLSService } from './service/xls.service';
import { FileController } from './file.controller';
import { ZipService } from './service/zip.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueueAsync({
      name: 'product-queue',
      useFactory: () => ({
        redis: {
          host: configs.redis.host,
          port: Number(configs.redis.port),
        },
      }),
    }),
    CategoryModule,
  ],
  controllers: [ProductController, FileController],
  providers: [
    ProductService,
    ProductRepository,
    ProductQueueProcessor,
    XLSService,
    ZipService,
  ],
  exports: [ProductService],
})
export class ProductModule {}
