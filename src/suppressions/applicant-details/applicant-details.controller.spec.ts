import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from 'app/common/common.module';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';
import { ApplicantDetailsController } from 'app/suppressions/applicant-details/applicant-details.controller';

describe('ApplicantDetails Controller', () => {
  let controller: ApplicantDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, SuppressionsModule],
      controllers: [ApplicantDetailsController],
    }).compile();

    controller = module.get<ApplicantDetailsController>(ApplicantDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
