import { Controller, Post, UsePipes, UseFilters, Redirect, Body } from '@nestjs/common';
import { APPLICANT_DETAILS_URI, LANDING_PAGE_URI, ADDRESS_DETAILS_URI } from 'src/common/routes/routes.constants';
import { BaseController, BasicControllerData } from 'src/common/controllers/base.controller';
import { ApplicantDetailsModel } from './applicant-details.model';
import { JoiValidationPipe } from 'src/common/validation/joi-validation.pipe';
import { JoiValidationExceptionFilter } from 'src/common/filters/joi-validation-exception.filter';
import { NavigationControl } from 'src/common/navigation/navigation-control';

const template = 'applicant-details';
const navigation = new NavigationControl(LANDING_PAGE_URI, ADDRESS_DETAILS_URI);

@Controller(APPLICANT_DETAILS_URI)
export class ApplicantDetailsController extends BaseController<ApplicantDetailsModel> {

    constructor() {
        super(template, navigation);
    }

    @Post()
    @UsePipes(new JoiValidationPipe(ApplicantDetailsModel))
    @UseFilters(new JoiValidationExceptionFilter(ApplicantDetailsModel, {
        template,
        navigation
    }))
    @Redirect(navigation.next())
    public onPost(@Body() _: ApplicantDetailsModel): void {
    }


}
