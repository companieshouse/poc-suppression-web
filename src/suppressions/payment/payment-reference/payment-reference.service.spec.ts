import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReferenceService } from './payment-reference.service';

describe('PaymentReferenceService', () => {
  let service: PaymentReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentReferenceService],
    }).compile();

    service = module.get<PaymentReferenceService>(PaymentReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a 7 digit number string', () => {
    expect(service.generateNewReference(7).length).toBe(7);
  })
});
