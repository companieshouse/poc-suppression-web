import { Controller, Post, UsePipes, UseFilters, Redirect, Body } from '@nestjs/common';
import { APPLICANT_DETAILS_URI, LANDING_PAGE_URI, ADDRESS_DETAILS_URI } from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { ApplicantDetailsModel } from './applicant-details.model';
import { JoiValidationPipe } from 'app/common/validation/joi-validation.pipe';
import { JoiValidationExceptionFilter } from 'app/common/filters/joi-validation-exception.filter';
import { NavigationControl } from 'app/common/navigation/navigation-control';

const template = 'applicant-details';
const navigation = new NavigationControl(LANDING_PAGE_URI, ADDRESS_DETAILS_URI);

@Controller(APPLICANT_DETAILS_URI)
export class ApplicantDetailsController extends BaseController<ApplicantDetailsModel> {

    constructor() {
        super(template, navigation);
    }

    @Post()
    @UsePipes(new JoiValidationPipe(ApplicantDetailsModel))
    @UseFilters(new JoiValidationExceptionFilter({ template, navigation }))
    @Redirect(navigation.next())
    public onPost(@Body() _: ApplicantDetailsModel): void { }


}
