import { Controller } from '@nestjs/common';
import { APPLICANT_DETAILS_URI, LANDING_PAGE_URI, ADDRESS_DETAILS_URI } from 'src/routes/routes.constants';
import { BaseController } from 'src/base/base.controller';

@Controller(APPLICANT_DETAILS_URI)
export class ApplicantDetailsController extends BaseController {

    constructor() {
        super('service/applicant-details', {
            next: () => ADDRESS_DETAILS_URI,
            previous: () => LANDING_PAGE_URI
        });
    }
}
