import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReferenceService } from './payment-reference.service';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';
import { CommonModule } from 'app/common/common.module';

describe('PaymentReferenceService', () => {
  let service: PaymentReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, SuppressionsModule],
      providers: [PaymentReferenceService],
    }).compile();

    service = module.get<PaymentReferenceService>(PaymentReferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a 7 digit number string', () => {
    expect(service.generateNewReference(7).length).toBe(7);
  });
});
