import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController, GalleryController } from "./upload/upload.controller";

@Module({
  imports: [],
  controllers: [AppController, UploadController, GalleryController],
  providers: [AppService],
})
export class AppModule {}
