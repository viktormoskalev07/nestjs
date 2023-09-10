import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController, GalleryController ,LogController} from "./upload/upload.controller";

@Module({
  imports: [],
  controllers: [AppController, UploadController, GalleryController ,LogController],
  providers: [AppService],
})
export class AppModule {}
