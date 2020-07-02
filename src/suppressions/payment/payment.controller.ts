import { Controller } from '@nestjs/common';
import { PAYMENT_PAGE_URI } from 'src/common/routes/routes.constants';
import { BaseController } from 'src/common/controllers/base.controller';
import { NavigationControl } from 'src/common/navigation/navigation-control';
import { PaymentReferenceService } from './payment-reference/payment-reference.service';
import { ConfigService } from '@nestjs/config';

@Controller(PAYMENT_PAGE_URI)
export class PaymentController extends BaseController {

    constructor(private paymentReference: PaymentReferenceService, configService: ConfigService) {
        super('payment', new NavigationControl(PAYMENT_PAGE_URI, configService.get('GOVUK-GOV_PAY_URL')));
    }

    public onGetModelData(): any {
        return { reference: this.paymentReference.generateNewReference(7) }
    }
}
