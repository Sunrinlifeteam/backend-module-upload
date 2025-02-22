import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { SHA1 } from 'shared/lib/functions/hash';
import { FileRequest } from 'shared/lib/transfer/upload.dto';

@Injectable()
export class UploadService {
  private readonly s3Storage: AWS.S3;
  private readonly awsS3Bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Storage = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
    this.awsS3Bucket = this.configService.get<string>('AWS_S3_BUCKET');
  }

  public async uploadFile({ buffer, mimetype }: FileRequest): Promise<string> {
    const hash = SHA1(buffer);
    const filename = `${hash}.${mimetype.split('/')[1]}`;
    const response = await this.s3Storage
      .upload({
        Bucket: this.awsS3Bucket,
        Key: filename,
        Body: buffer,
        ContentType: mimetype,
        ContentDisposition: 'inline',
      })
      .promise();
    return response?.Location;
  }
}
