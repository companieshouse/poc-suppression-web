import {
  Controller, Get, Req, Res
} from '@nestjs/common';
import {
  CONFIRMATION_PAGE_URI,
  PAYMENT_PAGE_URI
} from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { APP_SESSION_DATA_KEY } from 'app/app.module';
import { Suppression } from 'app/suppressions/model/suppression.model';
import { Session } from 'ch-node-session-handler';
import {Request, Response} from "express";

const navigation = new NavigationControl(PAYMENT_PAGE_URI, CONFIRMATION_PAGE_URI);
const template = 'confirmation';

@Controller(CONFIRMATION_PAGE_URI)
export class ConfirmationController extends BaseController<string> {
  constructor() {
    super(template, navigation);
  }

  @Get()
  protected onGet(@Req() request: Request, @Res() response: Response): void {

    const ref = request.query.ref;
    return response.render(this.template, {
      ...this.navigation,
      ref
    });
  }

  public onGetModelDataFromSession(session: Session): Suppression | {} {
    return session?.getExtraData<Suppression>(APP_SESSION_DATA_KEY) || {};
  }
}
