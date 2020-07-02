import { Controller, Render, Get, Post, Redirect } from '@nestjs/common';
import { BaseController } from 'src/common/controllers/base.controller';
import { LANDING_PAGE_URI, APPLICANT_DETAILS_URI } from 'src/common/routes/routes.constants';
import { NavigationControl } from 'src/common/navigation/navigation-control';

@Controller(LANDING_PAGE_URI)
export class LandingController extends BaseController {

    constructor() {
        super('start', new NavigationControl(LANDING_PAGE_URI, APPLICANT_DETAILS_URI));
    }
}
