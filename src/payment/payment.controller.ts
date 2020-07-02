import { Controller } from '@nestjs/common';
import { PAYMENT_PAGE_URI } from 'src/common/routes/routes.constants';
import { BaseController } from 'src/common/controllers/base.controller';
import { NavigationControl } from 'src/common/navigation/navigation-control';

@Controller(PAYMENT_PAGE_URI)
export class PaymentController extends BaseController {

    constructor() {
        super('payment', new NavigationControl(PAYMENT_PAGE_URI, PAYMENT_PAGE_URI));
    }
}
