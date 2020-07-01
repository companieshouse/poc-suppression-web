import { Test, TestingModule } from '@nestjs/testing';
import { DocumentDetailsController } from './document-details.controller';

describe('DocumentDetails Controller', () => {
  let controller: DocumentDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentDetailsController],
    }).compile();

    controller = module.get<DocumentDetailsController>(DocumentDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
