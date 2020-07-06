import {
  Controller,
  Body,
  Post,
  Redirect,
  UsePipes,
  ValidationPipe,
  ValidationError,
  UseFilters,
} from '@nestjs/common';
import { ADDRESS_DETAILS_URI, APPLICANT_DETAILS_URI, DOCUMENT_DETAILS_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { AddressDetailsModel } from './address-details.model';
import { TypedUnprocessableEntityException } from 'app/common/exceptions/typed-unprocessable-entity.exception';
import { ApplicantDetailsModel } from '../applicant-details/applicant-details.model';
import { ModelValidationExceptionFilter } from 'app/common/filters/model-validation-exception.filter';

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
  public onPost(@Body() addressDetails: AddressDetailsModel): AddressDetailsModel {
    return addressDetails;
  }
}
