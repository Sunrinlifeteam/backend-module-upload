import { Controller, UnsupportedMediaTypeException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { allowedTypes } from '../shared/constants/file';
import { FileRequest, FileResponse } from 'src/shared/transfer/upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @GrpcMethod('UploadService', 'uploadImage')
  public async uploadImage(message: FileRequest): Promise<FileResponse> {
    if (allowedTypes.includes(message.mimetype)) {
      return {
        url: await this.uploadService.uploadFile(message),
      };
    }
    throw new UnsupportedMediaTypeException();
  }
}
