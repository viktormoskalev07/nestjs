import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { promises as fsPromises } from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file' })
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
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<any> {
    const dirPath = join(__dirname, '..', '..', 'uploads');

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
    }

    const filePath = join(dirPath, file.originalname);

    await fsPromises.writeFile(filePath, file.buffer);
    return {
      status: 'success',
      message: 'File uploaded successfully',
    };
  }
}
