import { ApplicantDetailsModel } from 'app/suppressions/applicant-details/applicant-details.model';
import { AddressDetailsModel } from 'app/suppressions/address-details/address-details.model';
import {DocumentDetailsModel} from "app/suppressions/document-details/document-details.model";
import {LinkModel} from "app/suppressions/model/link.model";

export interface Suppression {
  reference: string;
  links: LinkModel;
  applicantDetails: ApplicantDetailsModel;
  oldAddressDetails: AddressDetailsModel;
  documentDetails: DocumentDetailsModel;
  newAddressDetails: AddressDetailsModel;
}
