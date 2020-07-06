import { ApplicantDetailsModel } from '../applicant-details/applicant-details.model';
import { AddressDetailsModel } from '../address-details/address-details.model';

export type SuppressionsJourney = {
  applicantDetails: ApplicantDetailsModel | {};
  addressDetails: AddressDetailsModel | {};
};
