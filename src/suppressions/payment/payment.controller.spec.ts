import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from 'app/suppressions/payment/payment.controller';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';
import { PaymentReferenceService } from 'app/suppressions/payment/payment-reference/payment-reference.service';
import { CommonModule } from 'app/common/common.module';

describe('Payment Controller', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SuppressionsModule, CommonModule],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
