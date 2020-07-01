import { Controller, Get, Render } from '@nestjs/common';
import { PAYMENT_PAGE_URI } from 'src/routes/routes.constants';
import { BaseController } from 'src/base/base.controller';

@Controller(PAYMENT_PAGE_URI)
export class PaymentController extends BaseController {

    constructor() {
        super('service/payment', {
            next: () => PAYMENT_PAGE_URI,
            previous: () => PAYMENT_PAGE_URI
        });
    }
}
