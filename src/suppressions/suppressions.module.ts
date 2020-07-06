import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LandingController } from './landing/landing.controller';
import { AddressDetailsController } from './address-details/address-details.controller';
import { ApplicantDetailsController } from './applicant-details/applicant-details.controller';
import { DocumentDetailsController } from './document-details/document-details.controller';
import { ServiceAddressController } from './service-address/service-address.controller';
import { PaymentController } from './payment/payment.controller';
import { PaymentReferenceService } from './payment/payment-reference/payment-reference.service';
import { CommonModule } from 'app/common/common.module';
import { SessionMiddleware } from 'app/common/middleware/session.middleware';
import { LANDING_PAGE_URI } from 'app/common/routes/routes.constants';
import * as cookieParser from 'cookie-parser';
@Module({
  imports: [CommonModule],
  controllers: [
    LandingController,
    AddressDetailsController,
    ApplicantDetailsController,
    DocumentDetailsController,
    ServiceAddressController,
    PaymentController,
  ],
  providers: [PaymentReferenceService],
})
export class SuppressionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), SessionMiddleware)
      .exclude({ method: RequestMethod.ALL, path: LANDING_PAGE_URI })
      .forRoutes('*');
  }
}
