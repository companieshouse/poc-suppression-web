import { Module } from '@nestjs/common';
import { LandingController } from './suppressions/landing/landing.controller';
import { AddressDetailsController } from './suppressions/address-details/address-details.controller';
import { ApplicantDetailsController } from './suppressions/applicant-details/applicant-details.controller';
import { DocumentDetailsController } from './suppressions/document-details/document-details.controller';
import { ServiceAddressController } from './suppressions/service-address/service-address.controller';
import { PaymentController } from './suppressions/payment/payment.controller';
import { PaymentReferenceService } from './suppressions/payment/payment-reference/payment-reference.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [
    LandingController,
    AddressDetailsController,
    ApplicantDetailsController,
    DocumentDetailsController,
    ServiceAddressController,
    PaymentController
  ],
  providers: [PaymentReferenceService]
})
export class AppModule { }
