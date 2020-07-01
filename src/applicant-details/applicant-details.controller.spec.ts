import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantDetailsController } from './applicant-details.controller';

describe('ApplicantDetails Controller', () => {
  let controller: ApplicantDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantDetailsController],
    }).compile();

    controller = module.get<ApplicantDetailsController>(ApplicantDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
