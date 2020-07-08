import { Test, TestingModule } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { CommonModule } from 'app/common/common.module';

describe('Base Controller', () => {
  let controller: BaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [BaseController],
    }).compile();

    controller = module.get<BaseController>(BaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
