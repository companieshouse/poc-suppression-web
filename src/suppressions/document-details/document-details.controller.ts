import {Body, Controller, Post, Redirect, Req, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import {
  DOCUMENT_DETAILS_URI,
  ADDRESS_DETAILS_URI,
  SERVICE_ADDRESS_PAGE_URI,
} from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import {ValidationError} from "class-validator";
import {TypedUnprocessableEntityException} from "app/common/exceptions/typed-unprocessable-entity.exception";
import {ApplicantDetailsModel} from "app/suppressions/applicant-details/applicant-details.model";
import {ModelValidationExceptionFilter} from "app/common/filters/model-validation-exception.filter";
import {Request} from "express";
import {APP_SESSION_DATA_KEY} from "app/app.module";
import {Session} from "ch-node-session-handler";
import {Suppression} from "app/suppressions/model/suppression.model";
import {DocumentDetailsModel} from "app/suppressions/document-details/document-details.model";

const navigation = new NavigationControl(ADDRESS_DETAILS_URI, SERVICE_ADDRESS_PAGE_URI);
const template = 'document-details';
@Controller(DOCUMENT_DETAILS_URI)
export class DocumentDetailsController extends BaseController {
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
  public onPost(@Body() documentDetails: DocumentDetailsModel, @Req() request: Request): DocumentDetailsModel {
    console.log('document data is: ' + JSON.stringify(documentDetails));
    this.addToSession(APP_SESSION_DATA_KEY, request, { documentDetails });
    return documentDetails;
  }

  public onGetModelDataFromSession(session: Session | undefined): DocumentDetailsModel | {} {
    return session?.getExtraData<Suppression>(APP_SESSION_DATA_KEY)?.documentDetails || {};
  }
}
