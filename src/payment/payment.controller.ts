import { Controller } from '@nestjs/common';
import { PAYMENT_PAGE_URI } from 'src/common/routes/routes.constants';
import { BaseController } from 'src/common/controllers/base.controller';
import { NavigationControl } from 'src/common/navigation/navigation-control';
import { PaymentReferenceService } from './payment-reference/payment-reference.service';

@Controller(PAYMENT_PAGE_URI)
export class PaymentController extends BaseController {

    constructor(private paymentReference: PaymentReferenceService) {
        super('payment', new NavigationControl(PAYMENT_PAGE_URI, PAYMENT_PAGE_URI));
    }

    public onGetModelData(): any {
        return { reference: this.paymentReference.generateNewReference(7) }
    }
}
