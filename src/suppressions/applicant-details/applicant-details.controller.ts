import { Controller, Post, UsePipes, UseFilters, Redirect, Body, ValidationPipe, Req } from '@nestjs/common';
import { APPLICANT_DETAILS_URI, LANDING_PAGE_URI, ADDRESS_DETAILS_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { ApplicantDetailsModel } from 'app/suppressions/applicant-details/applicant-details.model';
import { ModelValidationExceptionFilter } from 'app/common/filters/model-validation-exception.filter';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { TypedUnprocessableEntityException } from 'app/common/exceptions/typed-unprocessable-entity.exception';
import { ValidationError } from 'class-validator';
import { Request } from 'express';
import { Session } from 'ch-node-session-handler';
import { SuppressionsJourney } from 'app/suppressions/model/suppressions-journey.model';
import { APP_SESSION_DATA_KEY } from 'app/app.module';

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
  public onPost(@Body() applicantDetails: ApplicantDetailsModel, @Req() request: Request): ApplicantDetailsModel {
    this.addToSession(APP_SESSION_DATA_KEY, request, { applicantDetails });
    return applicantDetails;
  }

  public onGetModelDataFromSession(session: Session | undefined): ApplicantDetailsModel | {} {
    super.onGetModelDataFromSession(session);
    return session?.getExtraData<SuppressionsJourney>(APP_SESSION_DATA_KEY)?.applicantDetails || {};
  }
}
