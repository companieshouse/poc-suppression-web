import { Controller } from '@nestjs/common';
import { DOCUMENT_DETAILS_URI, ADDRESS_DETAILS_URI, SERVICE_ADDRESS_PAGE_URI } from 'src/routes/routes.constants';
import { BaseController } from 'src/base/base.controller';

@Controller(DOCUMENT_DETAILS_URI)
export class DocumentDetailsController extends BaseController {

    constructor() {
        super('service/document-details', {
            next: () => SERVICE_ADDRESS_PAGE_URI,
            previous: () => ADDRESS_DETAILS_URI
        });
    }
}
