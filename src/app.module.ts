import { Module } from '@nestjs/common';
import { LandingController } from './landing/landing.controller';
import { AddressDetailsController } from './address-details/address-details.controller';
import { ApplicantDetailsController } from './applicant-details/applicant-details.controller';
import { DocumentDetailsController } from './document-details/document-details.controller';
import { ServiceAddressController } from './service-address/service-address.controller';
import { PaymentController } from './payment/payment.controller';
import { PaymentReferenceService } from './payment/payment-reference/payment-reference.service';

@Module({
  imports: [],
  controllers: [
    LandingController,
    AddressDetailsController,
    ApplicantDetailsController,
    DocumentDetailsController,
    ServiceAddressController,
    PaymentController
  ],
  providers: [PaymentReferenceService],
})
export class AppModule { }
