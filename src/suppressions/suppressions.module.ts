import {Module, NestModule, MiddlewareConsumer, RequestMethod, HttpModule} from '@nestjs/common';
import { LandingController } from 'app/suppressions/landing/landing.controller';
import { AddressDetailsController } from 'app/suppressions/address-details/address-details.controller';
import { ApplicantDetailsController } from 'app/suppressions/applicant-details/applicant-details.controller';
import { DocumentDetailsController } from 'app/suppressions/document-details/document-details.controller';
import { ServiceAddressController } from 'app/suppressions/service-address/service-address.controller';
import { PaymentController } from 'app/suppressions/payment/payment.controller';
import { PaymentReferenceService } from 'app/suppressions/payment/payment-reference/payment-reference.service';
import { CommonModule } from 'app/common/common.module';
import { SessionMiddleware } from 'app/common/middleware/session.middleware';
import { LANDING_PAGE_URI } from 'app/common/routes/routes.constants';
import * as cookieParser from 'cookie-parser';
import {SuppressionService} from "app/common/services/suppression.service";
import {ConfirmationController} from "app/suppressions/confirmation/confirmation.controller";
import {PaymentService} from "app/common/services/payment.service";
@Module({
  imports: [CommonModule, HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  })],
  controllers: [
    LandingController,
    AddressDetailsController,
    ApplicantDetailsController,
    DocumentDetailsController,
    ServiceAddressController,
    PaymentController,
    ConfirmationController
  ],
  providers: [PaymentReferenceService, SuppressionService, PaymentService],
})
export class SuppressionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), SessionMiddleware)
      .exclude({ method: RequestMethod.ALL, path: LANDING_PAGE_URI })
      .forRoutes('*');
  }
}
