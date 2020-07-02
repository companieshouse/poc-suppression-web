import { Test, TestingModule } from '@nestjs/testing';
import { AddressDetailsController } from './address-details.controller';
import { CommonModule } from 'app/common/common.module';
import { SuppressionsModule } from '../suppressions.module';

describe('AddressDetails Controller', () => {
  let controller: AddressDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, SuppressionsModule],
      controllers: [AddressDetailsController],
    }).compile();

    controller = module.get<AddressDetailsController>(AddressDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
