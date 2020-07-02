import { Controller } from '@nestjs/common';
import { ADDRESS_DETAILS_URI, APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';

@Controller(ADDRESS_DETAILS_URI)
export class AddressDetailsController extends BaseController {
  constructor() {
    super('address-details', new NavigationControl(APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI));
  }
}
