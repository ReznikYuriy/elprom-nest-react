import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import * as fs from 'fs';
import { externalFilesConfig } from '../configs/files.config';

@Injectable()
export class ZipService {
  async createZipArchive(): Promise<any> {
    const output = fs.createWriteStream(
      `${externalFilesConfig.path}${externalFilesConfig.archive_name}`,
    );
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Add files to the archive

    archive.append(
      fs.createReadStream(
        `${externalFilesConfig.path}${externalFilesConfig.xlsx_name}`,
      ),
      {
        name: externalFilesConfig.xlsx_name,
      },
    );

    archive.pipe(output);

    // Finalize the archive
    archive.finalize();

    return archive;
  }
}
