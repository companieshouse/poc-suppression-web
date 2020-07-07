import {
  Controller,
  Body,
  Post,
  Redirect,
  UsePipes,
  ValidationPipe,
  ValidationError,
  UseFilters,
  Req,
} from '@nestjs/common';
import { ADDRESS_DETAILS_URI, APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { AddressDetailsModel } from './address-details.model';
import { TypedUnprocessableEntityException } from 'app/common/exceptions/typed-unprocessable-entity.exception';
import { ModelValidationExceptionFilter } from 'app/common/filters/model-validation-exception.filter';
import { Request } from 'express';
import { APP_SESSION_DATA_KEY } from 'app/app.module';
import { SuppressionsJourney } from '../model/suppressions.model';
import { Session } from 'ch-node-session-handler';

const navigation = new NavigationControl(APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI);
const template = 'address-details';

@Controller(ADDRESS_DETAILS_URI)
export class AddressDetailsController extends BaseController<AddressDetailsModel> {
  constructor() {
    super(template, navigation);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      exceptionFactory: (err: ValidationError[]) =>
        new TypedUnprocessableEntityException<AddressDetailsController>(err),
    }),
  )
  @UseFilters(new ModelValidationExceptionFilter({ template, navigation }))
  @Redirect(navigation.next())
  public onPost(@Body() addressDetails: AddressDetailsModel, @Req() request: Request): AddressDetailsModel {
    this.addToSession(request, { addressDetails });
    return addressDetails;
  }

  public onGetModelDataFromSession(session: Session): AddressDetailsModel | {} {
    super.onGetModelDataFromSession(session);
    return session?.getExtraData<SuppressionsJourney>(APP_SESSION_DATA_KEY).addressDetails;
  }
}
