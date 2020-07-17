import {
  Controller,
  Post,
  Req, Res,
} from '@nestjs/common';
import { PAYMENT_PAGE_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import {Suppression} from "app/suppressions/model/suppression.model";
import {APP_SESSION_DATA_KEY} from "app/app.module";
import {Session} from "ch-node-session-handler";
import {Request, Response} from "express";
import {PaymentService} from "app/common/services/payment.service";

const navigation = new NavigationControl(PAYMENT_PAGE_URI, 'GOV_PAY_URL');
@Controller(PAYMENT_PAGE_URI)
export class PaymentController extends BaseController {
  constructor(private paymentService: PaymentService) {
    super('payment', navigation);
  }

  @Post()
  public async onPost(@Req() request: Request, @Res() response: Response): Promise<void> {

    const suppression: Suppression = this.onGetModelData(request);
    const payUrl: string = await this.paymentService.initPayment(suppression.reference, suppression.documentDetails.companyNumber);
    response.redirect(payUrl);
  }

  public onGetModelDataFromSession(session: Session | undefined): Suppression | {} {
    return session?.getExtraData<Suppression>(APP_SESSION_DATA_KEY) || {};
  }
}
