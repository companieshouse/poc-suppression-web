import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAddressController } from './service-address.controller';

describe('ServiceAddress Controller', () => {
  let controller: ServiceAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAddressController],
    }).compile();

    controller = module.get<ServiceAddressController>(ServiceAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
