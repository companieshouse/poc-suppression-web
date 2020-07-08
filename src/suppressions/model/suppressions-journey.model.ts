import { ApplicantDetailsModel } from 'app/suppressions/applicant-details/applicant-details.model';
import { AddressDetailsModel } from 'app/suppressions/address-details/address-details.model';

export type SuppressionsJourney = {
  applicantDetails: ApplicantDetailsModel | {};
  addressDetails: AddressDetailsModel | {};
};
