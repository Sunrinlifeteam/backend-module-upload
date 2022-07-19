import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

describe('UploadController', () => {
  let UploadController: UploadController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [UploadService],
    }).compile();

    UploadController = app.get<UploadController>(UploadController);
  });

  describe('root', () => {
    it('should return "Upload World!"', () => {
      expect(UploadController.getUpload()).toBe('Upload World!');
    });
  });
});
