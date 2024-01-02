import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import * as fs from 'fs';
import { priceListConfig } from '../configs/price.config';

@Injectable()
export class ZipService {
  async createZipArchive(): Promise<any> {
    const output = fs.createWriteStream(
      `${priceListConfig.path}${priceListConfig.archive_name}`,
    );
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Add files to the archive

    archive.append(
      fs.createReadStream(
        `${priceListConfig.path}${priceListConfig.xlsx_name}`,
      ),
      {
        name: priceListConfig.xlsx_name,
      },
    );

    archive.pipe(output);

    // Finalize the archive
    archive.finalize();

    return archive;
  }
}
