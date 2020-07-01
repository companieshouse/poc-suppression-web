import { Controller } from '@nestjs/common';
import { SERVICE_ADDRESS_PAGE_URI, DOCUMENT_DETAILS_URI, PAYMENT_PAGE_URI } from 'src/routes/routes.constants';
import { BaseController } from 'src/base/base.controller';

@Controller(SERVICE_ADDRESS_PAGE_URI)
export class ServiceAddressController extends BaseController {

    constructor() {
        super('service/service-address', {
            next: () => PAYMENT_PAGE_URI,
            previous: () => DOCUMENT_DETAILS_URI
        });
    }
}
