import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAddressController } from './service-address.controller';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';
import { CommonModule } from 'app/common/common.module';

describe('ServiceAddress Controller', () => {
  let controller: ServiceAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SuppressionsModule, CommonModule],
      controllers: [ServiceAddressController],
    }).compile();

    controller = module.get<ServiceAddressController>(ServiceAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
