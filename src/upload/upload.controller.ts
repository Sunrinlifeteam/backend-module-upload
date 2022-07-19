import {
  Controller,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @GrpcMethod('UploadService', 'uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadImage(
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<string> {
    if (
      !['image/jpeg', 'image/png', 'image/gif'].includes(imageFile.mimetype)
    ) {
      throw new UnsupportedMediaTypeException();
    }
    return await this.uploadService.uploadFile(imageFile);
  }
}
