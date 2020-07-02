import { Test, TestingModule } from '@nestjs/testing';
import { LandingController } from './landing.controller';
import { CommonModule } from 'app/common/common.module';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';

describe('Index Controller', () => {
  let controller: LandingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, SuppressionsModule],
      controllers: [LandingController],
    }).compile();

    controller = module.get<LandingController>(LandingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
