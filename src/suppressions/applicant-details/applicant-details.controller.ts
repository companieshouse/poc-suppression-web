import { Controller, Post, UsePipes, UseFilters, Redirect, Body, ValidationPipe } from '@nestjs/common';
import { APPLICANT_DETAILS_URI, LANDING_PAGE_URI, ADDRESS_DETAILS_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { ApplicantDetailsModel } from './applicant-details.model';
import { ModelValidationExceptionFilter } from 'app/common/filters/model-validation-exception.filter';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { TypedUnprocessableEntityException } from 'app/common/exceptions/typed-unprocessable-entity.exception';
import { ValidationError } from 'class-validator';

const template = 'applicant-details';
const navigation = new NavigationControl(LANDING_PAGE_URI, ADDRESS_DETAILS_URI);

@Controller(APPLICANT_DETAILS_URI)
export class ApplicantDetailsController extends BaseController<ApplicantDetailsModel> {
  constructor() {
    super(template, navigation);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      exceptionFactory: (err: ValidationError[]) => new TypedUnprocessableEntityException<ApplicantDetailsModel>(err),
    }),
  )
  @UseFilters(new ModelValidationExceptionFilter({ template, navigation }))
  @Redirect(navigation.next())
  public onPost(@Body() body: ApplicantDetailsModel): ApplicantDetailsModel {
    return body;
  }
}
