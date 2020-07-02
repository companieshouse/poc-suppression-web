import { Controller } from '@nestjs/common';
import { SERVICE_ADDRESS_PAGE_URI, DOCUMENT_DETAILS_URI, PAYMENT_PAGE_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';

@Controller(SERVICE_ADDRESS_PAGE_URI)
export class ServiceAddressController extends BaseController {

    constructor() {
        super('service-address', new NavigationControl(DOCUMENT_DETAILS_URI, PAYMENT_PAGE_URI));
    }
}
