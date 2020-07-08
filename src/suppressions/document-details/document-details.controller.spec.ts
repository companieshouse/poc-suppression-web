import { Test, TestingModule } from '@nestjs/testing';
import { DocumentDetailsController } from './document-details.controller';
import { CommonModule } from 'app/common/common.module';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';

describe('DocumentDetails Controller', () => {
  let controller: DocumentDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, SuppressionsModule],
      controllers: [DocumentDetailsController],
    }).compile();

    controller = module.get<DocumentDetailsController>(DocumentDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
