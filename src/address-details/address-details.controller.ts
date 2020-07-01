import { Controller } from '@nestjs/common';
import { ADDRESS_DETAILS_URI, APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI } from 'src/routes/routes.constants';
import { BaseController } from 'src/base/base.controller';

@Controller(ADDRESS_DETAILS_URI)
export class AddressDetailsController extends BaseController {

    constructor() {
        super('service/address-details', {
            next: () => DOCUMENT_DETAILS_URI,
            previous: () => APPLICANT_DETAILS_URI
        });
    }
}
