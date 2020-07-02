import { Controller } from '@nestjs/common';
import { ADDRESS_DETAILS_URI, APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI } from 'src/common/routes/routes.constants';
import { BaseController } from 'src/common/controllers/base.controller';
import { NavigationControl } from 'src/common/navigation/navigation-control';

@Controller(ADDRESS_DETAILS_URI)
export class AddressDetailsController extends BaseController {

    constructor() {
        super('address-details', new NavigationControl(APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI));
    }
}
