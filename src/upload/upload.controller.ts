import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  Render,
  Get, Body
} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
 

import { promises as fsPromises, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
 
  private readonly dirPath = join(__dirname, '..', '..', 'uploads');
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
    console.log("request")
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
    }
if(!file){
  throw new HttpException('File is missing', HttpStatus.BAD_REQUEST);
}
    const filePath = join(dirPath, file?.originalname);

    await fsPromises.writeFile(filePath, file.buffer);
    return {
      status: 'success',
      message: 'File uploaded successfully',
    };
  }
  @Get()
  @ApiOperation({ summary: 'Get all uploaded files' })
  getAllFiles(): any {
    if (!existsSync(this.dirPath)) {
      return {
        status: 'error',
        message: 'No files have been uploaded yet',
      };
    }

    const fileNames = readdirSync(this.dirPath);
    return {
      status: 'success',
      files: fileNames,
    };
  }
}
@Controller('gallery')
export class GalleryController {
  private readonly dirPath = join(__dirname, '..', '..', 'uploads');

  @Get()
  @Render('gallery')
  displayGallery() {
    console.log(9)
    let files = [];
    if (existsSync(this.dirPath)) {
      files = readdirSync(this.dirPath);
    }
    return { files };
  }
}


@Controller('log')
export class LogController {
  @Post('body')
  logRequestBody(@Body() body: any): any {
    console.log("Тело POST-запроса:", body);
    return {
      status: 'success',
      message: 'Тело запроса выведено в консоль',
    };
  }
}