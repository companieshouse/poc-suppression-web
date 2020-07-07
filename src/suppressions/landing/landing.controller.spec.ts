import { Test, TestingModule } from '@nestjs/testing';
import { LandingController } from 'app/suppressions/landing/landing.controller';
import { SuppressionsModule } from '../suppressions.module';

describe('Index Controller', () => {
  let controller: LandingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SuppressionsModule],
    }).compile();

    controller = module.get<LandingController>(LandingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
