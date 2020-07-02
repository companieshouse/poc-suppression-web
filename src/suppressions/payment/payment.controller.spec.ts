import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { CommonModule } from 'app/common/common.module';
import { SuppressionsModule } from 'app/suppressions/suppressions.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentReferenceService } from './payment-reference/payment-reference.service';

describe('Payment Controller', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        SuppressionsModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [PaymentController],
      providers: [PaymentReferenceService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
